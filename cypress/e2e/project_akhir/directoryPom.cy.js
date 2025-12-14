import authData from '../../fixtures/authData.json';
import directoryData from "../../fixtures/directoryData.json";
import DirectoryPage from "../../support/pageObjects/directoryPage";
import LoginPage from '../../support/pageObjects/loginPage.js';


describe('Directory Scenario with POM', () => {
    // TC 001 - Empty filter search
    it('TC 001 - Should display all records when searching with empty filters', () => {
        // LoginPage
        //     .visit()
        //     .waitForPageLoad()
        //     .inputUsername(authData.users.valid.username)
        //     .inputPassword(authData.users.valid.password)
        //     .clickLoginButton()
        //     .verifyOnDashboard()

        // login
        LoginPage
            .loginWithValidCredentials()

        // directory page load
        DirectoryPage
            .waitForDashboardPageLoad()
            .clickDirectoryMenu()
            .verifyOnDirectory()
            .waitForDirectoryPageLoad()

        // verify empty filters
        DirectoryPage
            .verifyFieldIsEmpty(DirectoryPage.getEmployeeNameField)
            .verifyDropdownHasDefault(DirectoryPage.getJobTitleDropdown)
            .verifyDropdownHasDefault(DirectoryPage.getLocationDropdown)
        
        // click search
        DirectoryPage
            .interceptBeforeAction(
                directoryData.endpoints.apis.filteredEmployees,
                'employeesApi',
                'GET'
            )
            .verifyElementEnabled(DirectoryPage.getResetButton)
            .clickSearchButton()
            .waitForIntercept('employeesApi', 5000)
            .verifyStatusCode('employeesApi', 200)
            .verifyHasLengthGreaterThan(
                DirectoryPage.getRecordsContainer,
                0)
    });

    // TC 002 - Filter by Job Title
    it('TC 002 - Should filter employees by Job Title only', () => {
        // login
        LoginPage
            .loginWithValidCredentials()

        // directory page load
        DirectoryPage
            .waitForDashboardPageLoad()
            .interceptBeforeAction(
                directoryData.endpoints.assets.doc.viewDirectory,
                'viewDirectory',
                'GET'
            )
            .clickDirectoryMenu()
            .waitForIntercept('viewDirectory', 5000)
            .verifyStatusCode('viewDirectory', 200)
            .verifyOnDirectory()
            .waitForDirectoryPageLoad()

        // filter
        DirectoryPage
            .clickJobTitleDropdown()
            .selectOptionByIndex(1)

        // search
        DirectoryPage
            .interceptBeforeAction(
                directoryData.endpoints.apis.filteredEmployees,
                'filteredEmployeesApi',
                'GET'
            )
            .clickSearchButton()
            .waitForIntercept('filteredEmployeesApi', 5000)
            .verifyStatusCode('filteredEmployeesApi', 200)
    });

    // TC 003 - Filter by Location
    it('TC 003 - Should filter employees by Location only', () => {
        // login
        // LoginPage
        //     .loginWithValidCredentials()

        // login
        LoginPage
            .visit()
            .waitForPageLoad()
            .inputUsername(authData.users.valid.username)
            .inputPassword(authData.users.valid.password)
            .interceptBeforeAction(
                directoryData.endpoints.apis.timeAtWork,
                'timeAtWork',
                'GET'
            )
            .clickLoginButton()
            .waitForIntercept(
                'timeAtWork',
                3000
            )
            .verifyStatusCode(
                'timeAtWork',
                200
            )
            .verifyOnDashboard()

        // directory page load
        DirectoryPage
            .waitForDashboardPageLoad()
            .clickDirectoryMenu()
            .verifyOnDirectory()
            .waitForDirectoryPageLoad()

        // filter 
        DirectoryPage
            .clickLocationDropdown()
            .selectOptionByIndex(1)

        // search
        DirectoryPage
            .interceptBeforeAction(
                directoryData.endpoints.apis.filteredEmployees,
                'filteredEmployeesApi',
                'GET'
            )
            .clickSearchButton()
            .waitForIntercept('filteredEmployeesApi', 5000)
            .verifyStatusCode('filteredEmployeesApi', 200)
    });

    // TC 004 - Filter by Job Title AND Location (Combined)
    it('TC 004 - Should filter by both Job Title and Location', () => {
        // login
        // LoginPage
        //     .loginWithValidCredentials()

        // login
        LoginPage
            .visit()
            .waitForPageLoad()
            .inputUsername(authData.users.valid.username)
            .inputPassword(authData.users.valid.password)
            .interceptBeforeAction(
                directoryData.endpoints.assets.doc.dashboardIndex,
                'dashboardIndex',
                'GET'
            )
            .clickLoginButton()
            .waitForIntercept(
                'dashboardIndex',
                3000
            )
            .verifyStatusCode(
                'dashboardIndex',
                200
            )
            .verifyOnDashboard()

        // directory page load
        DirectoryPage
            .waitForDashboardPageLoad()
            .clickDirectoryMenu()
            .verifyOnDirectory()
            .waitForDirectoryPageLoad()
        
        // filter 
        DirectoryPage
            .clickJobTitleDropdown()
            .selectOptionByIndex(1)
            .clickLocationDropdown()
            .selectOptionByIndex(1)

        // search
        DirectoryPage
            .interceptBeforeAction(
                directoryData.endpoints.apis.filteredEmployees,
                'filteredEmployeesApi',
                'GET'
            )
            .clickSearchButton()
            .waitForIntercept('filteredEmployeesApi', 5000)
            .verifyStatusCode('filteredEmployeesApi', 200)
            // .verifyHasLengthGreaterThan(
            //     DirectoryPage.getRecordsContainer,
            //     0)
    });

    // TC 005 - Search by Employee Name (Autocomplete)
    it('TC 005 - Should filter by Employee Name using autocomplete', () => {
        // login
        LoginPage
            .loginWithValidCredentials()

        // directory page load
        DirectoryPage
            .waitForDashboardPageLoad()
            .interceptBeforeAction(
                directoryData.endpoints.assets.styles.bootstrapIcons,
                'bootstrapIcons',
                'GET'
            )
            .clickDirectoryMenu()
            .waitForIntercept(
                'bootstrapIcons',
                3000
            )
            .verifyStatusCode(
                'bootstrapIcons',
                200
            )
            .verifyOnDirectory()
            .waitForDirectoryPageLoad()

        // filter
        DirectoryPage
            .interceptBeforeAction(
                directoryData.endpoints.apis.searchEmployeeName,
                'searchEmployeeApi',
                'GET'
            )
            .inputEmployeeName('John')
            .waitForIntercept('searchEmployeeApi', 3000)
            .verifyStatusCode('searchEmployeeApi', 200)
            .selectFirstAutocompleteOption()
        
        // search
        DirectoryPage
            .clickSearchButton()
            .verifyHasLengthGreaterThan(
                DirectoryPage.getRecordsContainer,
                0)
    });

    it("TC 006 - Should show 'No Records Found' when searching by non-existent employee name", () => {
        // login
        LoginPage
            .loginWithValidCredentials()

        // directory page load
        DirectoryPage
            .waitForDashboardPageLoad()
            .interceptBeforeAction(
                directoryData.endpoints.assets.scripts.chunkVendors,
                'chunkVendorsJs',
                'GET'
            )
            .clickDirectoryMenu()
            .waitForIntercept(
                'chunkVendorsJs',
                3000
            )
            .verifyStatusCode(
                'chunkVendorsJs',
                200
            )
            .verifyOnDirectory()
            .waitForDirectoryPageLoad()
        
        // filter
        DirectoryPage
            .interceptBeforeAction(
                directoryData.endpoints.apis.searchEmployeeName,
                'searchEmployeeApi',
                'GET'
            )
            .inputEmployeeName('invalid')
            .waitForIntercept('searchEmployeeApi', 3000)
            .verifyStatusCode('searchEmployeeApi', 200)
            .verifyResponseDataApiIsEmpty('searchEmployeeApi', 'response.body.data')
            .getEmployeeMessage('No Records Found')
    });

     // TC 007 - Reset Filters After Search
    it('TC 007 - Should reset to default view after applying filters', () => {
        // login
        LoginPage
            .loginWithValidCredentials()

        // directory page load
        DirectoryPage
            .waitForDashboardPageLoad()
            .interceptBeforeAction(
                directoryData.endpoints.assets.fonts.nunitoRegular,
                'nunitoRegular',
                'GET'
            )
            .clickDirectoryMenu()
            .waitForIntercept(
                'nunitoRegular',
                3000
            )
            .verifyStatusCode(
                'nunitoRegular',
                200
            )
            .verifyOnDirectory()
            .waitForDirectoryPageLoad()
        
        // filter
        DirectoryPage
            .inputEmployeeName('John')
            .clickJobTitleDropdown()
            .selectOptionByIndex(1)
            .clickLocationDropdown()
            .selectOptionByIndex(1)
        
        // reset
        DirectoryPage
            .interceptBeforeAction(
                directoryData.endpoints.apis.filteredEmployees,
                'filteredEmployeeApi',
                'GET'
            )
            .clickResetButton()
            .waitForIntercept('filteredEmployeeApi', 5000)
            .verifyStatusCode('filteredEmployeeApi', 200)
        
        // verify result
        DirectoryPage
            .verifyFieldIsEmpty(DirectoryPage.getEmployeeNameField)
            .verifyFieldIsEmpty(DirectoryPage.getJobTitleDropdown)
            .verifyFieldIsEmpty(DirectoryPage.getLocationDropdown)
            .verifyHasLengthGreaterThan(
                DirectoryPage.getRecordsContainer,
                0)
    });

    // TC 008 - Load All Employee Photos
    it('TC 008 - Should load all employee profile photos in directory', () => {
        // login
        // LoginPage
        //     .loginWithValidCredentials()

        // login
        LoginPage
            .visit()
            .waitForPageLoad()
            .inputUsername(authData.users.valid.username)
            .inputPassword(authData.users.valid.password)
            .interceptBeforeAction(
                directoryData.endpoints.apis.actionSummary,
                'actionSummary',
                'GET'
            )
            .clickLoginButton()
            .waitForIntercept(
                'actionSummary',
                3000
            )
            .verifyStatusCode(
                'actionSummary',
                200
            )
            .verifyOnDashboard()

        // directory page load
        DirectoryPage
            .waitForDashboardPageLoad()
            .clickDirectoryMenu()
            .verifyOnDirectory()
            .waitForDirectoryPageLoad()
        
        // search
        DirectoryPage
            .clickSearchButton()

        // load all photos 
        DirectoryPage
            .verifyHasLengthGreaterThan(
                DirectoryPage.getRecordsContainer,
                0)
            .verifyAllPhotosLoaded()
    });

    // TC 009 - Display Employee Details
    it('TC 009 - Should display employee details panel when clicking on employee card', () => {
        // login
        LoginPage
            .loginWithValidCredentials()

        // directory page load
        DirectoryPage
            .waitForDashboardPageLoad()
            .clickDirectoryMenu()
            .verifyOnDirectory()
            .waitForDirectoryPageLoad()
        
        // search
        DirectoryPage
            .clickSearchButton()
        
        // verify employee details
        DirectoryPage
            .verifyEmployeeCardIsNotEmpty()
            .interceptBeforeAction(
                directoryData.endpoints.apis.detailEmployee,
                'detailEmployee',
                'GET'
            )
            .clickFirstEmployeeCard()
            .waitForIntercept(
                'detailEmployee',
                3000
            )
            .verifyStatusCode(
                'detailEmployee',
                200
            )
            .verifyEmployeeDetailVisible()
            .verifyEmployeeDetailsContent()
    });

    // TC 010 - Back Button Functionality in Employee Detail
    it('TC 010 - Should navigate back to directory list when clicking back button', () => {
        // login
        // LoginPage
        //     .loginWithValidCredentials()

        // login
        LoginPage
            .visit()
            .waitForPageLoad()
            .inputUsername(authData.users.valid.username)
            .inputPassword(authData.users.valid.password)
            .interceptBeforeAction(
                directoryData.endpoints.apis.feed,
                'feed',
                'GET'
            )
            .clickLoginButton()
            .waitForIntercept(
                'feed',
                3000
            )
            .verifyStatusCode(
                'feed',
                200
            )
            .verifyOnDashboard()

        // directory page load
        DirectoryPage
            .waitForDashboardPageLoad()
            .clickDirectoryMenu()
            .verifyOnDirectory()
            .waitForDirectoryPageLoad()
        
        // search
        DirectoryPage
            .clickSearchButton()
        
        // verify employee details
        DirectoryPage
            .verifyEmployeeCardIsNotEmpty()
            .clickFirstEmployeeCard()
            .verifyEmployeeDetailVisible()
            .verifyEmployeeDetailsContent()
        
        // click back button
        DirectoryPage
            .clickEmployeeDetailBackButton()
            .verifyEmployeeDetailNotVisible
    });

});