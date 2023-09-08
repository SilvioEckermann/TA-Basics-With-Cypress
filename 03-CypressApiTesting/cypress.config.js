const { defineConfig } = require('cypress');

module.exports = defineConfig({
  video: false,
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'Report - API Testing with Cypress',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },
  env: {
    email: 'email@gmail.com',
    password: 'password',
    apiUrl: 'https://api.realworld.io/api',
  },
  e2e: {
    baseUrl: 'https://demo.realworld.io/#/',
    browser: 'electron',
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
});
