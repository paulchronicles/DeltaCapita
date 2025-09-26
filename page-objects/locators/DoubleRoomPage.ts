import {BasePage} from "../../base/BasePage";
import {Locator, Page} from "@playwright/test";

export class DoubleRoomPage extends BasePage {


    private readonly calendar: Locator;
    public readonly doubleRoomHeader: Locator;
    public readonly day16: Locator;
    public readonly day18: Locator;
    public readonly selectedEvent: Locator;
    public readonly priceSummaryHeader: Locator;
    public readonly pricePerNight: Locator;
    public readonly totalPrice: Locator;
    public readonly reserveNowButton: Locator;
    private readonly lastnameValidationMessage: Locator;
    private readonly firstnameValidationMessage: Locator;
    private readonly firstnameInput: Locator;
    private readonly lastnameInput: Locator;
    private readonly emailInput: Locator;
    private readonly phoneInput: Locator;
    private readonly bookingConfirmedHeader: Locator;
    private readonly returnHomeLink: Locator;
    private readonly bookingDates: Locator;


    constructor(page: Page) {
        super(page);


        this.calendar = this.page.locator("div[aria-label='Month View']");
        this.doubleRoomHeader = this.page.locator("//h1[normalize-space()='Double Room']");
        this.day16 = this.page.locator("//button[normalize-space()='16']");
        this.day18 = this.page.locator("//button[normalize-space()='19']");
        this.selectedEvent =  this.page.locator(".rbc-event-content[title='Selected']");
        this.priceSummaryHeader = this.page.locator("//h3[normalize-space()='Price Summary']");
        this.pricePerNight = this.page.locator("//span[normalize-space()='£150 x 4 nights']");
        this.totalPrice = this.page.locator("//span[normalize-space()='£600']");
        this.reserveNowButton = this.page.locator("//button[normalize-space()='Reserve Now']");
        this.lastnameValidationMessage = this.page.locator("//li[normalize-space()='Lastname should not be blank']");
        this.firstnameValidationMessage = this.page.locator("//li[normalize-space()='Firstname should not be blank']");
        this.firstnameInput = this.page.locator("input[placeholder='Firstname']");
        this.lastnameInput = this.page.locator("input[placeholder='Lastname']");
        this.emailInput = this.page.locator("input[placeholder='Email']");
        this.phoneInput = this.page.locator("input[placeholder='Phone']");
        this.bookingConfirmedHeader = this.page.locator("//h2[normalize-space()='Booking Confirmed']");
        this.returnHomeLink = this.page.locator("//a[normalize-space()='Return home']");
        this.bookingDates = this.page.locator("//strong[normalize-space()='2025-09-16 - 2025-09-19']");

    }

    /**
     * Check if calendar is visible
     */
    async isCalendarVisible(): Promise<boolean> {
        return await this.isElementVisible(this.calendar);
    }

    /**
     * Check if reservation page header is visible
     */
    async isReservationPageHeaderVisible(): Promise<boolean> {
        return await this.isElementVisible(this.doubleRoomHeader);
    }

    /**
     * Get reservation page header text
     */
    async getReservationPageHeaderText(): Promise<string> {
        return await this.getElementText(this.doubleRoomHeader);
    }


    async selectFromDay16ToDay19(): Promise<void> {

        // Cells for 16 and 18
        const day16Locator = this.day16;
        const day19Locator = this.day18;

        // Get centres
        const s = await day16Locator.boundingBox();
        const e = await day19Locator.boundingBox();
        if (!s || !e) throw new Error('Calendar cells not visible');

        // Drag with multiple steps so mousemove events fire
        await this.page.mouse.move(s.x + s.width / 2, s.y + s.height / 2);
        await this.page.mouse.down();                                    // press on the CELL
        await this.page.mouse.move(e.x + e.width / 2, e.y + e.height / 2, { steps: 30 });
        await this.page.mouse.up();


    }

    /**
     * Check if price summary header is visible
     */
    async isPriceSummaryHeaderVisible(): Promise<boolean> {
        return await this.isElementVisible(this.priceSummaryHeader);
    }

    /**
     * Check if price per night is visible
     */
    async isPricePerNightVisible(): Promise<boolean> {
        return await this.isElementVisible(this.pricePerNight);
    }

    /**
     * Get price per night text
     */
    async getPricePerNightText(): Promise<string> {
        return await this.getElementText(this.pricePerNight);
    }

    /**
     * Check if total price is visible
     */
    async isTotalPriceVisible(): Promise<boolean> {
        return await this.isElementVisible(this.totalPrice);
    }

    /**
     * Get total price text
     */
    async getTotalPriceText(): Promise<string> {
        return await this.getElementText(this.totalPrice);
    }

    /**
     * Click Reserve Now button
     */
    async clickReserveNowButton(): Promise<void> {
        await this.clickElement(this.reserveNowButton);
    }


    /**
     * Check if lastname validation message is visible
     */
    async isLastnameValidationMessageVisible(): Promise<boolean> {
        return await this.isElementVisible(this.lastnameValidationMessage);
    }


    /**
     * Check if firstname validation message is visible
     */
    async isFirstnameValidationMessageVisible(): Promise<boolean> {
        return await this.isElementVisible(this.firstnameValidationMessage);
    }


    /**
     * Fill firstname input field
     */
    async fillFirstname(firstname: string): Promise<void> {
        await this.fillInput(this.firstnameInput, firstname);
    }

    /**
     * Fill lastname input field
     */
    async fillLastname(lastname: string): Promise<void> {
        await this.fillInput(this.lastnameInput, lastname);
    }

    /**
     * Fill email input field
     */
    async fillEmail(email: string): Promise<void> {
        await this.fillInput(this.emailInput, email);
    }

    /**
     * Fill phone input field
     */
    async fillPhone(phone: string): Promise<void> {
        await this.fillInput(this.phoneInput, phone);
    }


    /**
     * Fill all form fields
     */
    async fillReservationForm(firstname: string, lastname: string, email: string, phone: string): Promise<void> {
        await this.fillFirstname(firstname);
        await this.fillLastname(lastname);
        await this.fillEmail(email);
        await this.fillPhone(phone);
    }

    /**
     * Check if booking confirmed header is visible
     */
    async isBookingConfirmedHeaderVisible(): Promise<boolean> {
        return await this.isElementVisible(this.bookingConfirmedHeader);
    }

    /**
     * Check if return home link is visible
     */
    async isReturnHomeLinkVisible(): Promise<boolean> {
        return await this.isElementVisible(this.returnHomeLink);
    }

    /**
     * Check if booking dates are visible
     */
    async isBookingDatesVisible(): Promise<boolean> {
        return await this.isElementVisible(this.bookingDates);
    }

    /**
     * Get booking dates text
     */
    async getBookingDatesText(): Promise<string> {
        return await this.getElementText(this.bookingDates);
    }

}
