// Note: Unlike what could be expected, once an ENV var is found by dotenv, it won't be overridden
//  So, the order must be from the most important to the less important
//  See https://github.com/motdotla/dotenv/issues/256#issuecomment-598676663
require('@next/env').loadEnvConfig(process.cwd());

/**
 * Importing next during test applies automated polyfills:
 *  - Polyfill the built-in "fetch" provided by Next.js
 *
 * @see https://github.com/vercel/next.js/discussions/13678#discussioncomment-22383 How to use built-in fetch in tests?
 * @see https://nextjs.org/blog/next-9-4#improved-built-in-fetch-support Next.js Blog - Improved Built-in Fetch Support
 * @see https://jestjs.io/docs/en/configuration#setupfilesafterenv-array About setupFilesAfterEnv usage
 */
require('next');

// Backup of the native console object for later re-use
global._console = global.console;

// Force mute console by returning a mock object that mocks the props we use
global.muteConsole = () => {
  return {
    debug: jest.fn(),
    error: jest.fn(),
    info: jest.fn(),
    log: jest.fn(),
    warn: jest.fn(),
  };
};

// Mock __non_webpack_require__ to use the standard node.js "require"
global['__non_webpack_require__'] = require;

jest.mock('react-i18next', () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: (str) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
        language: 'cimode',
      },
    };
  },
}));

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
