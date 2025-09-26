import { Page, Locator } from '@playwright/test';
import { BasePage } from '../../base/BasePage';

/**
 * Home Page Object Model
 * Extends BasePage to provide specific functionality for the home page
 */
export class HomePage extends BasePage {

  private readonly bookNowButton: Locator;
  public readonly bookNowButton2: Locator;
  private readonly roomsSectionHeader: Locator;
  private readonly roomsSectionDescription: Locator;
  private readonly doubleRoomType: Locator;


  constructor(page: Page) {
    super(page);

    // Initialize locators for the Restful-booker-platform demo site
    this.bookNowButton = this.page.locator('.btn.btn-primary.btn-lg');
    this.bookNowButton2 = this.page.locator("//div[@class='row g-4']//div[2]//div[1]//div[3]//a[1]");
    this.roomsSectionHeader = this.page.locator("section[id='rooms'] h2[class='display-5']");
    this.roomsSectionDescription = this.page.locator("section[id='rooms'] p[class='lead text-muted']");
    this.doubleRoomType = this.page.locator("//h5[normalize-space()='Double']");

  }

  /**
   * Click the Book Now button
   */
  async clickBookNowButton(): Promise<void> {
    await this.clickElement(this.bookNowButton);
    await this.waitForPageLoad();
  }


  /**
   * Click the second Book Now button
   */
  async clickDoubleBookNowButton(): Promise<void> {
    await this.clickElement(this.bookNowButton2);
    await this.waitForPageLoad();
  }

  /**
   * Check if rooms section header is visible
   */
  async isRoomsSectionHeaderVisible(): Promise<boolean> {
    return await this.isElementVisible(this.roomsSectionHeader);
  }


  /**
   * Check if rooms section description is visible
   */
  async isRoomsSectionDescriptionVisible(): Promise<boolean> {
    return await this.isElementVisible(this.roomsSectionDescription);
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


}
