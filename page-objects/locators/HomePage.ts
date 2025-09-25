import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base/BasePage';

/**
 * Home Page Object Model
 * Extends BasePage to provide specific functionality for the home page
 */
export class HomePage extends BasePage {
  // Page elements for Restful-booker-platform demo
  private readonly bookNowButton: Locator;
  private readonly bookNowButton2: Locator;
  private readonly roomsSectionHeader: Locator;
  private readonly roomsSectionDescription: Locator;
  private readonly doubleRoomType: Locator;
  private readonly calendar: Locator;
  private readonly reservationPageHeader: Locator;

  constructor(page: Page) {
    super(page, '/');

    // Initialize locators for the Restful-booker-platform demo site
    this.bookNowButton = this.page.locator('.btn.btn-primary.btn-lg');
    this.bookNowButton2 = this.page.locator("//div[@class='row g-4']//div[2]//div[1]//div[3]//a[1]");
    this.roomsSectionHeader = this.page.locator("section[id='rooms'] h2[class='display-5']");
    this.roomsSectionDescription = this.page.locator("section[id='rooms'] p[class='lead text-muted']");
    this.doubleRoomType = this.page.locator("//h5[normalize-space()='Double']");
    this.calendar = this.page.locator("div[aria-label='Month View']");
    this.reservationPageHeader = this.page.locator("//h1[normalize-space()='Double Room']");
  }

  /**
   * Click the Book Now button
   */
  async clickBookNowButton(): Promise<void> {
    await this.clickElement(this.bookNowButton);
    await this.waitForPageLoad();
  }

  /**
   * Check if Book Now button is visible
   */
  async isBookNowButtonVisible(): Promise<boolean> {
    return await this.isElementVisible(this.bookNowButton);
  }

  /**
   * Get Book Now button text
   */
  async getBookNowButtonText(): Promise<string> {
    return await this.getElementText(this.bookNowButton);
  }

  /**
   * Click the second Book Now button
   */
  async clickBookNowButton2(): Promise<void> {
    await this.clickElement(this.bookNowButton2);
    await this.waitForPageLoad();
  }

  /**
   * Check if second Book Now button is visible
   */
  async isBookNowButton2Visible(): Promise<boolean> {
    return await this.isElementVisible(this.bookNowButton2);
  }

  /**
   * Get second Book Now button text
   */
  async getBookNowButton2Text(): Promise<string> {
    return await this.getElementText(this.bookNowButton2);
  }

  /**
   * Check if rooms section header is visible
   */
  async isRoomsSectionHeaderVisible(): Promise<boolean> {
    return await this.isElementVisible(this.roomsSectionHeader);
  }

  /**
   * Get rooms section header text
   */
  async getRoomsSectionHeaderText(): Promise<string> {
    return await this.getElementText(this.roomsSectionHeader);
  }

  /**
   * Check if rooms section description is visible
   */
  async isRoomsSectionDescriptionVisible(): Promise<boolean> {
    return await this.isElementVisible(this.roomsSectionDescription);
  }

  /**
   * Get rooms section description text
   */
  async getRoomsSectionDescriptionText(): Promise<string> {
    return await this.getElementText(this.roomsSectionDescription);
  }

  /**
   * Check if double room type is visible
   */
  async isDoubleRoomTypeVisible(): Promise<boolean> {
    return await this.isElementVisible(this.doubleRoomType);
  }

  /**
   * Get double room type text
   */
  async getDoubleRoomTypeText(): Promise<string> {
    return await this.getElementText(this.doubleRoomType);
  }

  /**
   * Click the double room type
   */
  async clickDoubleRoomType(): Promise<void> {
    await this.clickElement(this.doubleRoomType);
  }

  /**
   * Check if calendar is visible
   */
  async isCalendarVisible(): Promise<boolean> {
    return await this.isElementVisible(this.calendar);
  }

  /**
   * Wait for calendar to be visible
   */
  async waitForCalendar(): Promise<void> {
    await this.waitForElement(this.calendar);
  }

  /**
   * Check if reservation page header is visible
   */
  async isReservationPageHeaderVisible(): Promise<boolean> {
    return await this.isElementVisible(this.reservationPageHeader);
  }

  /**
   * Get reservation page header text
   */
  async getReservationPageHeaderText(): Promise<string> {
    return await this.getElementText(this.reservationPageHeader);
  }

  /**
   * Navigate to home page and wait for it to load
   */
  async navigateToHomePage(): Promise<void> {
    await this.goto();
    await this.waitForPageLoad();
    await this.waitForElement(this.bookNowButton);
  }

  /**
   * Verify home page is loaded correctly for Restful-booker-platform demo
   */
  async verifyHomePageLoaded(): Promise<void> {
    await this.verifyTitle('Restful-booker-platform demo');
    await this.verifyUrlContains('/');
    await this.waitForElement(this.bookNowButton);
  }
}
