const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportHeight: 1080,
  viewportWidth: 1920,
  e2e: {
    baseUrl: "http://localhost:4200",
    excludeSpecPattern: ["**/1-getting-started", "**/2-advanced-examples"], // exclude these examples from running
  },
});
