import { test, expect, Browser, Page, BrowserContext } from '@playwright/test';
import { HomePage } from '../../page-objects/locators/HomePage';
import { DoubleRoomPage } from '../../page-objects/locators/DoubleRoomPage';
import {TestHelpers} from "../../utils/TestHelpers";
import {TestDataGenerator} from '../../utils/TestDataGenerator';


test.describe('Home Page Tests', () => {
  let browser: Browser;
  let context: BrowserContext;
  let page: Page;
  let homePage: HomePage;
  let doubleRoomPage: DoubleRoomPage;


  test.beforeAll(async ({ browser: testBrowser }) => {
    browser = testBrowser;
    context = await browser.newContext();
    page = await context.newPage();
    
    // Initialize page objects
    homePage = new HomePage(page);
    doubleRoomPage = new DoubleRoomPage(page);
    
    // Load the page once
    await homePage.goto();
    await homePage.waitForPageLoad();
  });

  test.afterAll(async () => {
    await context.close();
  });


  test('Test Case 1: Navigate to booking', async () => {
    // Click Book Now button
    await homePage.clickBookNowButton();
    
    // User is navigated to the rooms section
    await expect(homePage.isRoomsSectionHeaderVisible()).resolves.toBeTruthy();
    await expect(homePage.isRoomsSectionDescriptionVisible()).resolves.toBeTruthy();
  });


  test('Test Case 2: Select a room', async () => {
    
    // Choose a room type (Double room)
    await expect(homePage.isDoubleRoomTypeVisible()).resolves.toBeTruthy();
    const selectedRoomName = await homePage.getDoubleRoomTypeText();

    // Navigate to rooms section first
    await TestHelpers.scrollToElement(page, homePage.bookNowButton2);

    // Click the Book Now button for that room
    await homePage.clickDoubleBookNowButton();
    
    // URL contains /reservation
    await expect(page).toHaveURL(/.*\/reservation.*/);
    
    // Header matches the selected room name
    await expect(doubleRoomPage.isReservationPageHeaderVisible()).resolves.toBeTruthy();
    const headerText = await doubleRoomPage.getReservationPageHeaderText();
    expect(headerText).toContain(selectedRoomName);
    
    // Calendar is displayed
    await expect(doubleRoomPage.isCalendarVisible()).resolves.toBeTruthy();
  });


  test('Test Case 3: Select dates', async () => {
    // Ensure we're on the reservation page with calendar visible
    await expect(doubleRoomPage.isCalendarVisible()).resolves.toBeTruthy();

    // Select check-in and check-out dates by dragging from day 16 to day 19 (3 nights)
    await doubleRoomPage.selectFromDay16ToDay18();

    //Verify the event bar labelled "Selected" appears
    const selectedEvent = doubleRoomPage.selectedEvent;
    await expect(selectedEvent).toBeVisible();

    //Scroll to Summary
    await  TestHelpers.scrollDown(page, 500);

    // Verify price summary is displayed
    await expect(doubleRoomPage.isPriceSummaryHeaderVisible()).resolves.toBeTruthy();
    await expect(doubleRoomPage.isPricePerNightVisible()).resolves.toBeTruthy();
    await expect(doubleRoomPage.isTotalPriceVisible()).resolves.toBeTruthy();

   // Get and verify price values
    const pricePerNight = await doubleRoomPage.getPricePerNightText();
    const price = await doubleRoomPage.getTotalPriceText();
    expect(pricePerNight).toBe('£150 x 4 nights');
    expect(price).toBe('£600');

  });


  test('Test Case 4: Reserve with validation', async () =>{

    const firstNameValidationError = doubleRoomPage.isFirstnameValidationMessageVisible();
    const lastNameValidationError = doubleRoomPage.isLastnameValidationMessageVisible();

    await doubleRoomPage.clickReserveNowButton();
    await doubleRoomPage.clickReserveNowButton();

    //Verify validation error
    await expect(firstNameValidationError).resolves.toBeTruthy();
    await expect(lastNameValidationError).resolves.toBeTruthy();

    // Fill in required fields with generated data
    const testData = await TestDataGenerator.generateUserData();
    await doubleRoomPage.fillReservationForm(
        testData.firstName,
        testData.lastName,
        testData.email,
        testData.phone
    );

    //Scroll Reserve Now Button in view
    await TestHelpers.scrollToElement(page, doubleRoomPage.reserveNowButton);

    // Submit the reservation
    await doubleRoomPage.clickReserveNowButton();
});

  test('Test Case 5: Booking confirmation', async () => {

    //Scroll to top
    await TestHelpers.scrollToTop(page);
    
    const expectedDates = '2025-09-16 - 2025-09-19';

    // Verify booking confirmation elements are visible
    await expect(doubleRoomPage.isBookingConfirmedHeaderVisible()).resolves.toBeTruthy();
    await expect(doubleRoomPage.isBookingDatesVisible()).resolves.toBeTruthy();
    await expect(doubleRoomPage.isReturnHomeLinkVisible()).resolves.toBeTruthy();

    // Verify booking dates match expected dates
    const actualDates = await doubleRoomPage.getBookingDatesText();
    expect(actualDates).toBe(expectedDates);

  });

})
