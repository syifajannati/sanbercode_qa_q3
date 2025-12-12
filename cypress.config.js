const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    supportFile: "cypress/support/e2e.js",
    baseUrl: "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
    defaultCommandTimeout: 30000,
  },
});
