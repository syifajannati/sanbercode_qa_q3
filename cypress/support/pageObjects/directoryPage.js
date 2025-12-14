class DirectoryPage {
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
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/directory/viewDirectory');
        return this;
    }       

    waitForDashboardPageLoad(timeout=10000) {
        const elements = [
            { element: this.getHeader(), timeout },
            { element: this.getSidebarMenu(), timeout },
            { element: this.getQuestionButton(), timeout },
            { element: this.getTimeAtWorkContainer(), timeout },
            // { element: this.getTimeAtWorkHeader(), timeout },
            // { element: this.getAttendanceCardProfile(), timeout },
            // { element: this.getAttendanceCardBar(), timeout },
            // { element: this.getAttendanceCardSummary(), timeout },
            // { element: this.getAttendanceChart(), timeout },
        ]

        elements.forEach(({ element, timeout: elementTimeout }) => {
            element.should('be.visible', { timeout: elementTimeout });
        });

        return this;
    }

    waitForDirectoryPageLoad(timeout=10000) {
        const elements = [
            { element: this.getHeader(), timeout },
            { element: this.getSidebarMenu(), timeout },
            { element: this.getQuestionButton(), timeout },
            { element: this.getDirectoryFilterContainer(), timeout },
            { element: this.getRecordsTitleHeader(), timeout },
            { element: this.getRecordsContainer(), timeout },
        ]

        elements.forEach(({ element, timeout: elementTimeout }) => {
            element.should('be.visible', { timeout: elementTimeout });
        });

        return this;
    }

    // ############################## Selector Methods ##############################

    getHeader() {
        return cy.get('.oxd-topbar-header')
    }

    getOrangehrmLogo() {
        return cy.get("img[alt='client brand banner']")
    }

    getUpgradeButton() {
        return cy.get('.oxd-glass-button')
    }

    getUserDropdown() {
        return cy.get('.oxd-userdropdown-tab')
    }

    getQuestionButton() {
        return cy.get('.oxd-topbar-body-nav-slot > .oxd-icon-button')
    }

    getTimeAtWorkContainer() {
        return cy.get(':nth-child(1) > .oxd-sheet')
    }

    getTimeAtWorkHeader() {
        return cy.get(':nth-child(1) > .oxd-sheet > .orangehrm-dashboard-widget-header')
    }

    getAttendanceCardProfile() {
        return cy.get('.orangehrm-attendance-card-profile')
    }

    getAttendanceCardBar() {
        return cy.get('.orangehrm-attendance-card-bar')
    }

    getAttendanceCardSummary() {
        return cy.get('.orangehrm-attendance-card-summary')
    }

    getAttendanceChart() {
        return cy.get('.emp-attendance-chart > canvas')
    }
    
    getSidebarMenu() {
        return cy.get(".oxd-sidepanel-body")
    }

    getDashboardTitle() {
        return cy.get('.oxd-topbar-header-breadcrumb > .oxd-text')
    }

    getDirectoryMenu() {
        return cy.get(':nth-child(9) > .oxd-main-menu-item')
    }

    getDirectoryFilterContainer() {
        return cy.get('.oxd-table-filter')
    }

    getDirectoryDropdown() {
        return cy.get("div[class='--toggle'] button[type='button']")
    }

    getEmployeeNameField() {
        return cy.get("input[placeholder='Type for hints...']")
    }

    getAutocompleteOptions() {
        return cy.get('.oxd-autocomplete-option');
    }

    getEmployeeMessage(expectedText) {
        return this.getAutocompleteOptions()
            .should('contain', expectedText)
    }

    getJobTitleDropdown() {
        return cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text')
    }

    getLocationDropdown() {
        return cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text')
    }

    getResetButton() {
        return cy.get("button[type='reset']")
    }

    getSearchButton() {
        return cy.get("button[type='submit']")
    }

    getRecordsTitleHeader() {
        return cy.get('.orangehrm-horizontal-padding')
    }

    getRecordsContainer() {
        return cy.get('.orangehrm-container')
    }

    // ############################## Action Methods ##############################

    clickDirectoryMenu() {
        this.getDirectoryMenu().click()
        return this;
    }

    clickDirectoryDropdown() {
        this.getDirectoryDropdown().click()
        return this;
    }

    inputEmployeeName(employeeName) {
        this.getEmployeeNameField().type(employeeName)
        return this;
    }

    selectFirstAutocompleteOption() {
        this.getAutocompleteOptions()
            .first()
            .click({ force: true })
            
        return this;
    }
    
    clickJobTitleDropdown() {
        this.getJobTitleDropdown().click()
        return this;
    }

    clickLocationDropdown() {
        this.getLocationDropdown().click()
        return this;
    }

    // selectJobTitle(optionText) {
    //     this.getJobTitleDropdown().click()

    //     cy.contains('.oxd-select-option', optionText)
    //         .scrollIntoView()
    //         .click({ force: true });

    //     return this;
    // }

    selectDropdown(optionText) {
        cy.contains('.oxd-select-option', optionText)
            .scrollIntoView()
            .click({ force: true });

        return this;
    }

    selectOptionByIndex(index) {
        cy.get('.oxd-select-option').eq(index).click();
        return this;
    }

    // selectLocation(optionText) {
    //     this.getLocationDropdown().click()

    //     cy.contains('.oxd-select-option', optionText)
    //         .scrollIntoView()
    //         .click({ force: true });

    //     return this;
    // }

    clickResetButton() {
        this.getResetButton().click()
        return this;
    }

    clickSearchButton() {
        this.getSearchButton().click()
        return this;
    }

    scrollRecords() {
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

    // ############################# Assertion Methods #############################

    verifyOnDirectory() {
        cy.url().should('include', 'viewDirectory');
        return this;
    }

    // Method untuk verify empty field
    verifyFieldIsEmpty(selectorMethod) {
        selectorMethod().should('have.value', '');
        return this;
    }

    // Method untuk verify element has length greater than
    verifyHasLengthGreaterThan(selectorMethod, minLength = 0) {
        selectorMethod().should('have.length.gt', minLength);
        return this;
    }

    // Method untuk verify dropdown has default value
    verifyDropdownHasDefault(dropdownMethod, defaultValue = '-- Select --') {
        dropdownMethod().should('contain', defaultValue);
        return this;
    }

     // Method untuk verify all filters are empty
    // verifyAllFiltersEmpty() {
    //     this.verifyEmployeeNameEmpty()
    //         .verifyJobTitleDefault()
    //         .verifyLocationDefault();
    //     return this;
    // }

    // Method untuk verify element is visible
    verifyElementVisible(selectorMethod) {
        selectorMethod().should('be.visible');
        return this;
    }

    // Method untuk verify element contains text
    verifyElementContainsText(selectorMethod, expectedText) {
        selectorMethod().should('contain', expectedText);
        return this;
    }
    
    // Method untuk verify element has exact text
    verifyElementHasText(selectorMethod, expectedText) {
        selectorMethod().should('have.text', expectedText);
        return this;
    }
    
    // Method untuk verify element exists
    verifyElementExists(selectorMethod) {
        selectorMethod().should('exist');
        return this;
    }
    
    // Method untuk verify element does not exist
    verifyElementNotExist(selectorMethod) {
        selectorMethod().should('not.exist');
        return this;
    }
    
    // Method untuk verify element is enabled
    verifyElementEnabled(selectorMethod) {
        selectorMethod().should('be.enabled');
        return this;
    }
    
    // Method untuk verify element is disabled
    verifyElementDisabled(selectorMethod) {
        selectorMethod().should('be.disabled');
        return this;
    }

    verifyStatusCode(alias, expectedStatusCode) {
        cy.get(`@${alias}`)
            .its('response.statusCode')
            .should('eq', expectedStatusCode);

        return this;
    }

    // Method untuk verify response data API kosong
    verifyResponseDataApiIsEmpty(alias, key) {
        cy.get(`@${alias}`)
            .its(key)
            .should('have.length', 0)

        return this
    }
}

export default new DirectoryPage();