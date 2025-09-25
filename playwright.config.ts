import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: 1,

  reporter: [
    ['html'],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/results.xml' }]
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.BASE_URL,

    /* Disable trace collection to avoid creating test-results folder */
    trace: 'off',

    /* Disable screenshot capture to avoid creating test-results folder */
    screenshot: 'off',

    /* Turn on video recording for every test  creating test-results folder */
    video: 'on',

    /* Automatically wait for elements to be visible before interacting with them */
    actionTimeout: 180000,
    navigationTimeout: 60000,
    contextOptions: {
      // Prevent immediate context closure
      reducedMotion: 'reduce',
      deviceScaleFactor: 1,
    },
    launchOptions: {
      slowMo: 2000,
    },
  },

  /* Configure projects for major browsers */
projects: [
    {
      name: 'Google Chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    },
  ],

});
