import authData from '../../fixtures/authData.json';


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
        return this;
    }       

    waitForPageLoad(timeout=10000) {
        const elements = [
            { element: this.getCompanyBrandingImage(), timeout },
            { element: this.getOrangeHrmLogo(), timeout },
            { element: this.getLoginTitle(), timeout: 5000 }, 
            { element: this.getUsernameInfo(), timeout },
            { element: this.getPasswordInfo(), timeout },
            { element: this.getUsernameIcon(), timeout },
            { element: this.getUsernameLabel(), timeout },
            { element: this.getUsernameField(), timeout },
            { element: this.getPasswordIcon(), timeout },
            { element: this.getPasswordLabel(), timeout },
            { element: this.getPasswordField(), timeout },
            { element: this.getLoginButton(), timeout }, 
        ];
        
        elements.forEach(({ element, timeout: elementTimeout }) => {
            element.should('be.visible', { timeout: elementTimeout });
        });
        
        return this;
    }

    // ############################## Selector Methods ##############################

    getCompanyBrandingImage() {
        return cy.get("img[alt='company-branding']")
    }

    getOrangeHrmLogo() {
        return cy.get("div[class='orangehrm-login-logo-mobile'] img[alt='orangehrm-logo']")
    }

    getLoginTitle() {
        return cy.get(".oxd-text.oxd-text--h5.orangehrm-login-title")
    }

    getUsernameInfo() {
        return cy.get('.oxd-sheet > :nth-child(1)')
    }
    
    getPasswordInfo() {
        return cy.get('.oxd-sheet > :nth-child(2)')
    }

    getUsernameIcon() {
        return cy.get(':nth-child(2) > .oxd-input-group > .oxd-input-group__label-wrapper > .oxd-icon')
    }

    getUsernameLabel() {
        return cy.get(':nth-child(2) > .oxd-input-group > .oxd-input-group__label-wrapper > .oxd-label')
    }

    getUsernameField() {
        // return cy.get('input[placeholder="Username"]')
        return cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input')
    }

    getPasswordIcon() {
        return cy.get(':nth-child(3) > .oxd-input-group > .oxd-input-group__label-wrapper > .oxd-icon')
    }

    getPasswordLabel() {
        return cy.get(':nth-child(3) > .oxd-input-group > .oxd-input-group__label-wrapper > .oxd-label')
    }

    getPasswordField() {
        // return cy.get('input[placeholder="Password"]');
        return cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input')
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

    getForgotPasswordText() {
        return cy.get(".oxd-text.oxd-text--p.orangehrm-login-forgot-header")
    }

    // ############################## Action Methods ##############################

    inputUsername(username) {
        this.getUsernameField().type(username);
        return this;
    }

    inputPassword(password) {  
        this.getPasswordField().type(password);
        return this;
    }

    clickLoginButton() {
        this.getLoginButton().click();
        return this;
    }

    clickEnter(element) {
        element.type('{enter}');
        return this;
    }

    typeAndEnter(element, value) {
        element.type(`${value}{enter}`);
        return this;
    }

    clickForgotPassword() {
        this.getForgotPasswordText()
            .click()
        return this;
    }

    loginWithValidCredentials() {
        this.visit()
            .waitForPageLoad()
            .inputUsername(authData.users.valid.username)
            .inputPassword(authData.users.valid.password)
            .clickLoginButton()
            .verifyOnDashboard()

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
        cy.get(`@${alias}`)
            .its('response.statusCode')
            .should('eq', expectedStatusCode);

        return this;
    }

    // ############################# Assertion Methods #############################

    verifyOnDashboard() {
        cy.url().should('include', 'dashboard');
        return this;
    }

    verifyInvalidCredentials() {
        this.getErrorMessage({ timeout: 10000 })
            .should('be.visible')
            .and('contain', 'Invalid credentials');
        
        return this;
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

        return this;
    }

    verifyBothRequiredErrors() {
        this.verifyRequiredFieldError('username');
        this.verifyRequiredFieldError('password');

        return this;
    }
}

export default new LoginPage();