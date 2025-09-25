import { Page, expect, Locator } from '@playwright/test';

/**
 * Test helper utilities for common test operations
 */
export class TestHelpers {

  /**
   * Scroll to element
   */
  static async scrollToElement(page: Page, locator: Locator): Promise<void> {
    await locator.scrollIntoViewIfNeeded();
  }

  /**
   * Scroll to top of page
   */
  static async scrollToTop(page: Page): Promise<void> {
    await page.evaluate(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /**
   * Scroll up by specified pixels
   */
  static async scrollUp(page: Page, pixels: number = 500): Promise<void> {
    await page.evaluate((scrollAmount) => {
      window.scrollBy({ top: -scrollAmount, behavior: 'smooth' });
    }, pixels);
  }

  /**
   * Scroll down by specified pixels
   */
  static async scrollDown(page: Page, pixels: number = 500): Promise<void> {
    await page.evaluate((scrollAmount) => {
      window.scrollBy({ top: scrollAmount, behavior: 'smooth' });
    }, pixels);
  }

  /**
   * Scroll to bottom of page
   */
  static async scrollToBottom(page: Page): Promise<void> {
    await page.evaluate(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    });
  }

}
