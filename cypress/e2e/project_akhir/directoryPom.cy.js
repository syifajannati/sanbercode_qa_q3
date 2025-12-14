import LoginPage from '../../support/pageObjects/loginPage.js';
import authData from '../../fixtures/authData.json';
import DirectoryPage from "../../support/pageObjects/directoryPage";
import directoryData from "../../fixtures/directoryData.json";


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

        LoginPage
            .loginWithValidCredentials()

        DirectoryPage
            .waitForDashboardPageLoad()
            .clickDirectoryMenu()
            .verifyOnDirectory()
            .waitForDirectoryPageLoad()
            .verifyFieldIsEmpty(DirectoryPage.getEmployeeNameField)
            .verifyDropdownHasDefault(DirectoryPage.getJobTitleDropdown)
            .verifyDropdownHasDefault(DirectoryPage.getLocationDropdown)
            .interceptBeforeAction(
                directoryData.endpoints.apis.filteredEmployees,
                'employeesApi',
                'GET'
            )
            .verifyElementEnabled(DirectoryPage.getResetButton)
            .clickResetButton()
            .waitForIntercept('employeesApi', 5000)
            .verifyStatusCode('employeesApi', 200)
            .verifyHasLengthGreaterThan(
                DirectoryPage.getRecordsContainer,
                0)
    });

    // TC 002 - Filter by Job Title
    it('TC 002 - Should filter employees by Job Title only', () => {
        LoginPage
            .loginWithValidCredentials()

        DirectoryPage
            .waitForDashboardPageLoad()
            .clickDirectoryMenu()
            .verifyOnDirectory()
            .waitForDirectoryPageLoad()
            .clickJobTitleDropdown()
            .selectOptionByIndex(1)
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

    // TC 003 - Filter by Location
    it('TC 003 - Should filter employees by Location only', () => {
        LoginPage
            .loginWithValidCredentials()

        DirectoryPage
            .waitForDashboardPageLoad()
            .clickDirectoryMenu()
            .verifyOnDirectory()
            .waitForDirectoryPageLoad()
            .clickLocationDropdown()
            // .selectDropdown('Texas R&D')
            .selectOptionByIndex(1)

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

    // TC 004 - Filter by Job Title AND Location (Combined)
    it('TC 004 - Should filter by both Job Title and Location', () => {
        LoginPage
            .loginWithValidCredentials()

        DirectoryPage
            .waitForDashboardPageLoad()
            .clickDirectoryMenu()
            .verifyOnDirectory()
            .waitForDirectoryPageLoad()
            .clickJobTitleDropdown()
            .selectOptionByIndex(1)
            .clickLocationDropdown()
            .selectOptionByIndex(1)

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
        LoginPage
            .loginWithValidCredentials()
            
        DirectoryPage
            .waitForDashboardPageLoad()
            .clickDirectoryMenu()
            .verifyOnDirectory()
            .waitForDirectoryPageLoad()
            .interceptBeforeAction(
                directoryData.endpoints.apis.searchEmployeeName,
                'searchEmployeeApi',
                'GET'
            )
            .inputEmployeeName('John')
            .waitForIntercept('searchEmployeeApi', 3000)
            .verifyStatusCode('searchEmployeeApi', 200)
            .selectFirstAutocompleteOption()
            .clickSearchButton()
            .verifyHasLengthGreaterThan(
                DirectoryPage.getRecordsContainer,
                0)
    });

    it("TC 006 - Should show 'No Records Found' when searching by non-existent employee name", () => {
        LoginPage
            .loginWithValidCredentials()

        DirectoryPage
            .waitForDashboardPageLoad()
            .clickDirectoryMenu()
            .verifyOnDirectory()
            .waitForDirectoryPageLoad()
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
        // Login
        LoginPage
            .loginWithValidCredentials()

        // Apply filters
        DirectoryPage
            .waitForDashboardPageLoad()
            .clickDirectoryMenu()
            .verifyOnDirectory()
            .waitForDirectoryPageLoad()
            .inputEmployeeName('John')
            .clickJobTitleDropdown()
            .selectOptionByIndex(1)
            .clickLocationDropdown()
            .selectOptionByIndex(1)
        
        // Then reset
        DirectoryPage
            .interceptBeforeAction(
                directoryData.endpoints.apis.filteredEmployees,
                'filteredEmployeeApi',
                'GET'
            )
            .clickResetButton()
            .waitForIntercept('filteredEmployeeApi', 5000)
            .verifyStatusCode('filteredEmployeeApi', 200)
            .verifyFieldIsEmpty(DirectoryPage.getEmployeeNameField)
            .verifyFieldIsEmpty(DirectoryPage.getJobTitleDropdown)
            .verifyFieldIsEmpty(DirectoryPage.getLocationDropdown)
            .verifyHasLengthGreaterThan(
                DirectoryPage.getRecordsContainer,
                0)
    });
});