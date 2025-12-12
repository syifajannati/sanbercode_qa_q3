class LoginPage {
    // ############################## General Methods ##############################
    // Disable cache untuk semua request
    disableCache() {
        Cypress.automation('remote:debugger:protocol', {
            command: 'Network.setCacheDisabled',
            params: { cacheDisabled: true }
        });
        
        return this;
    }

    visit() {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    }       

    waitForPageLoad() {
        cy.get("input[placeholder='Username']", { timeout: 10000 }).should('be.visible');
    }

    // ############################## Selector Methods ##############################

    getUsernameField() {
        return cy.get('input[placeholder="Username"]');
    }

    getPasswordField() {
        return cy.get('input[placeholder="Password"]');
    }

    getLoginButton() {
        return cy.get('.oxd-button');
    }

    getErrorMessage() {
        return cy.get('.oxd-alert-content');
    }

    getUsernameErrorMessage() {
        return cy.get(':nth-child(2) > .oxd-input-group > .oxd-text');
    }

    getPasswordErrorMessage() {
        return cy.get(':nth-child(3) > .oxd-input-group > .oxd-text');
    }

    // ############################## Action Methods ##############################

    inputUsername(username) {
        this.getUsernameField().type(username);
    }

    inputPassword(password) {  
        this.getPasswordField().type(password);
    }

    clickLoginButton() {
        this.getLoginButton().click();
    }

    clickEnter(element) {
        element.type('{enter}');
    }

    typeAndEnter(element, value) {
        element.type(`${value}{enter}`);
    }

    // ############################### Intercepted Actions ##############################

    // Intercept Methods untuk berbagai skenario
    interceptBeforeAction(endpoint, alias, method = 'GET') {
        cy.intercept(method, endpoint).as(alias);
    }

    waitForIntercept(alias, timeout = 5000) {
        cy.wait(`@${alias}`, { timeout });
    }

    verifyStatusCode(alias, expectedStatusCode) {
        cy.get(`@${alias}`).its('response.statusCode').should('eq', expectedStatusCode);
    }

    // ############################# Assertion Methods #############################

    verifyOnDashboard() {
        cy.url().should('include', 'dashboard');
    }

    verifyInvalidCredentials() {
        this.getErrorMessage({ timeout: 10000 })
            .should('be.visible')
            .and('contain', 'Invalid credentials');
    }

    verifyRequiredFieldError(field) {
        if (field === 'username') {
            this.getUsernameErrorMessage({ timeout: 10000 })
                .should('be.visible')
                .and('contain', 'Required');
        } else if (field === 'password') {
            this.getPasswordErrorMessage({ timeout: 10000 })
                .should('be.visible')
                .and('contain', 'Required');
        }
    }

    verifyBothRequiredErrors() {
        this.verifyRequiredFieldError('username');
        this.verifyRequiredFieldError('password');
    }
}

export default new LoginPage();