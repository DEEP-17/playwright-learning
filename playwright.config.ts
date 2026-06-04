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
    /* Run in headed mode (Cloudflare frequently blocks headless browsers) */
    headless: true, 
    
    /* Spoof a standard browser User-Agent */
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',

    /* Optional: Bypass HTTPS errors if the challenge messes with certificates */
    ignoreHTTPSErrors: true,

    launchOptions: {
      slowMo: 1000, 
    },
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
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
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
});