class ForgotPasswordPage {
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
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/requestPasswordResetCode');
        return this;
    }       

    waitForPageLoad(timeout=10000) {
        const elements = [
            { element: this.getForgotPasswordTitle(), timeout },
            { element: this.getInstructionTitle(), timeout },
            { element: this.getUsernameIcon(), timeout: 5000 }, 
            { element: this.getUsernameLabel(), timeout },
            { element: this.getUsernameField(), timeout },
            { element: this.getCancelButton(), timeout: 8000 }, 
            { element: this.getResetPassword(), timeout }
        ];
        
        elements.forEach(({ element, timeout: elementTimeout }) => {
            element.should('be.visible', { timeout: elementTimeout });
        });
        
        return this;
    }

    // ############################## Selector Methods ##############################

    getForgotPasswordTitle() {
        return cy.get(".oxd-text.oxd-text--h6.orangehrm-forgot-password-title");
    }

    getInstructionTitle() {
        return cy.get("p[class='oxd-text oxd-text--p']")
    }

    getUsernameIcon() {
        return cy.get(".oxd-icon.bi-person.oxd-input-group__label-icon")
    }

    getUsernameLabel() {
        return cy.get(".oxd-label")
    }

    getUsernameField() {
        return cy.get("input[placeholder='Username']")
    }

    getCancelButton() {
        return cy.get("button[type='button']")
    }

    getResetPassword() {
        return cy.get("button[type='submit']")
    }

    getUsernameErrorMessage() {
        return cy.get(".oxd-text.oxd-text--span.oxd-input-field-error-message.oxd-input-group__message")
    }

    // ############################## Action Methods ##############################
    inputUsername(username) {
        this.getUsernameField().type(username);
        return this;
    }

    clickCancelButton() {
        this.getCancelButton().click();
        return this;
    }

    clickResetPasswordButton() {
        this.getResetPassword().click();
        return this;
    }

    clickEnter(element) {
        element.type('{enter}');
        return this;
    }

    // ############################### Intercepted Actions ##############################
    interceptBeforeAction(endpoint, alias, method = 'GET') {
        cy.intercept(method, endpoint).as(alias);
        return this;
    }

    waitForIntercept(alias, timeout = 5000) {
        cy.wait(`@${alias}`, { timeout });
        return this;
    }

    verifyStatusCode(alias, expectedStatusCode) {
        cy.get(`@${alias}`).its('response.statusCode').should('eq', expectedStatusCode);
        return this;
    }

    // ############################# Assertion Methods #############################
    verifyRequiredFieldError() {
        this.getUsernameErrorMessage(
            {timeout: 1000})
            .should('be.visible')
            .and('contain', 'Required')
            
        return this;
    }

    verifySendPasswordReset() {
        cy.url().should('include', 'sendPasswordReset')
        return this;
    }

    verifyOnLogin() {
        cy.url().should('include', 'login')
        return this;
    }
}

export default new ForgotPasswordPage();