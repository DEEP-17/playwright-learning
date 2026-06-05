/**
 * Environment configuration loader
 * Loads variables from .env, falls back to .env.example defaults
 */

interface EnvConfig {
  // Application URLs
  baseUrl: string;
  loginUrl: string;
  bookUrl: string;
  cartUrl: string;

  // User Credentials
  userEmail: string;
  userPassword: string;

  // Test Data
  searchTerm: string;
  bookTitle: string;

  // Timeouts (milliseconds)
  popupTimeout: number;
  waitTimeout: number;
  searchTimeout: number;
  clickTimeout: number;
  smallWait: number;

  // UI Messages
  loginSuccessMessage: string;
  popupCloseMessage: string;
}

const defaultConfig: EnvConfig = {
  // Application URLs
  baseUrl: 'https://bookscape.com/',
  loginUrl: 'https://bookscape.com/login',
  bookUrl: 'https://bookscape.com/product-details/ncert-geography-hindi-9789351729938',
  cartUrl: 'https://bookscape.com/shopping-cart',

  // User Credentials (from .env.example defaults)
  userEmail: 'your-email@example.com',
  userPassword: 'your-password',

  // Test Data
  searchTerm: 'NCERT GEOGRAPHY',
  bookTitle: 'NCERT GEOGRAPHY [HINDI]',

  // Timeouts (milliseconds)
  popupTimeout: 5000,
  waitTimeout: 10000,
  searchTimeout: 15000,
  clickTimeout: 10000,
  smallWait: 500,

  // UI Messages
  loginSuccessMessage: 'Logged in successfully',
  popupCloseMessage: 'Popup not displayed',
};

/**
 * Get environment configuration with fallback to defaults
 */
export const getConfig = (): EnvConfig => {
  return {
    // Application URLs
    baseUrl: process.env.BASE_URL || defaultConfig.baseUrl,
    loginUrl: process.env.LOGIN_URL || defaultConfig.loginUrl,
    bookUrl: process.env.BOOK_URL || defaultConfig.bookUrl,
    cartUrl: process.env.CART_URL || defaultConfig.cartUrl,

    // User Credentials
    userEmail: process.env.USER_EMAIL || defaultConfig.userEmail,
    userPassword: process.env.USER_PASSWORD || defaultConfig.userPassword,

    // Test Data
    searchTerm: process.env.SEARCH_TERM || defaultConfig.searchTerm,
    bookTitle: process.env.BOOK_TITLE || defaultConfig.bookTitle,

    // Timeouts (milliseconds)
    popupTimeout: Number(process.env.POPUP_TIMEOUT) || defaultConfig.popupTimeout,
    waitTimeout: Number(process.env.WAIT_TIMEOUT) || defaultConfig.waitTimeout,
    searchTimeout: Number(process.env.SEARCH_TIMEOUT) || defaultConfig.searchTimeout,
    clickTimeout: Number(process.env.CLICK_TIMEOUT) || defaultConfig.clickTimeout,
    smallWait: Number(process.env.SMALL_WAIT) || defaultConfig.smallWait,

    // UI Messages
    loginSuccessMessage: process.env.LOGIN_SUCCESS_MESSAGE || defaultConfig.loginSuccessMessage,
    popupCloseMessage: process.env.POPUP_CLOSE_MESSAGE || defaultConfig.popupCloseMessage,
  };
};

// Export singleton instance for easy import
export const config = getConfig();

export default config;
