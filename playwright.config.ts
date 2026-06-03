import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  
  // --- Parallel Execution ---
  /* Run all tests in all files in parallel */
  fullyParallel: true,
  
  forbidOnly: !!process.env.CI,
  
  // --- Retries ---
  /* Retries failing tests. Set to 1 locally for debugging, 2 on CI */
  retries: process.env.CI ? 2 : 1,
  
  /* Number of concurrent workers. Undefined uses CPU cores efficiently. */
  workers: process.env.CI ? 1 : undefined,
  
  reporter: 'html',

  // --- Timeouts ---
  /* Global timeout per test */
  timeout: 30 * 1000, 
  expect: {
    /* Global timeout for expect() assertions */
    timeout: 5 * 1000,
  },

  use: {
    headless: true,
    launchOptions: {
      slowMo: 1000, // Slows down execution by 1 second per action for easier viewing
    },
    
    // --- Trace Viewer ---
    /* Options: 'on', 'off', 'on-first-retry', 'retain-on-failure' */
    /* 'retain-on-failure' is best practice as it saves space but helps debug failures */
    trace: 'retain-on-failure', 
    
    // --- Videos & Automated Screenshots ---
    /* Options: 'on', 'off', 'on-first-retry', 'retain-on-failure' */
    video: 'retain-on-failure',
    screenshot: 'only-on-failure', // Automatically take a screenshot if a test fails
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});