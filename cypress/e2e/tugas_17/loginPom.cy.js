import LoginPage from '../../support/pageObjects/loginPage.js';
import loginData from '../../fixtures/loginData.json';


describe('Scenario Login OrangeHRM dengan POM', () => {
    it('TC 001 - Login with valid username & password using Enter key', () => {
        LoginPage.visit()
        LoginPage.waitForPageLoad()
        LoginPage.inputUsername(loginData.valid.username)
        LoginPage.inputPassword(loginData.valid.password)
        LoginPage.interceptBeforeAction(
            loginData.endpoints.dashboardTimeAtWork, 
            'timeAtWork')
        LoginPage.clickEnter(LoginPage.getPasswordField())
        LoginPage.waitForIntercept('timeAtWork', 10000)
        LoginPage.verifyStatusCode('timeAtWork', 200)
        LoginPage.verifyOnDashboard()
    });
    
    it('TC 002 - Login with valid username & password using the login button', () => {
        LoginPage.disableCache()
        LoginPage.visit()
        LoginPage.waitForPageLoad()
        LoginPage.inputUsername(loginData.valid.username)
        LoginPage.inputPassword(loginData.valid.password)
        LoginPage.interceptBeforeAction(
            loginData.endpoints.orangeImage, 
            'orangeImage')
        LoginPage.clickLoginButton()
        LoginPage.waitForIntercept('orangeImage', 5000)
        LoginPage.verifyStatusCode('orangeImage', 200)
        LoginPage.verifyOnDashboard()
    });

    it('TC 003 - Login with invalid username & password using Enter key', () => {
        LoginPage.disableCache()
        LoginPage.visit()   
        LoginPage.waitForPageLoad()
        LoginPage.inputUsername(loginData.invalid.username)
        LoginPage.inputPassword(loginData.invalid.password)
        LoginPage.interceptBeforeAction(
            loginData.endpoints.appCss, 
            'appCss', 
            'GET')
        LoginPage.clickEnter(LoginPage.getPasswordField())
        LoginPage.waitForIntercept('appCss', 5000)
        LoginPage.verifyStatusCode('appCss', 200)
        LoginPage.verifyInvalidCredentials()
    });

    // TEST CASE 004
    it('TC 004 - Login with invalid username & password using the login button', () => {
        LoginPage.disableCache()
        LoginPage.visit()
        LoginPage.waitForPageLoad()
        LoginPage.inputUsername(loginData.invalid.username)
        LoginPage.inputPassword(loginData.invalid.password)
        LoginPage.interceptBeforeAction(
            loginData.endpoints.nunitoFont,
            'nunitoFont',
            'GET'
        )
        LoginPage.clickLoginButton()
        LoginPage.waitForIntercept('nunitoFont', 5000)
        LoginPage.verifyStatusCode('nunitoFont', 200)
        LoginPage.verifyInvalidCredentials();
    });

    // TEST CASE 005
    it('TC 005 - Login with a case-insensitive username', () => {
        LoginPage.disableCache()
        LoginPage.visit()
        LoginPage.waitForPageLoad()
        LoginPage.inputUsername(loginData.caseInsensitive.username)
        LoginPage.inputPassword(loginData.valid.password)
        LoginPage.interceptBeforeAction(
                loginData.endpoints.appJs,
                'appJs',
                'GET'
        )
        LoginPage.clickLoginButton()
        LoginPage.waitForIntercept('appJs', 5000)
        LoginPage.verifyStatusCode('appJs', 200)
        LoginPage.verifyOnDashboard();
    });

    // TEST CASE 006
    it('TC 006 - Login with invalid username', () => {
        LoginPage.disableCache()
        LoginPage.visit()
        LoginPage.waitForPageLoad()
        LoginPage.inputUsername(loginData.invalid.username)
        LoginPage.inputPassword(loginData.valid.password)
        LoginPage.interceptBeforeAction(
            loginData.endpoints.messages,
            'messages',
            'GET',
        )
        LoginPage.clickLoginButton()
        LoginPage.waitForIntercept('messages', 5000)
        LoginPage.verifyStatusCode('messages', 304)
        LoginPage.verifyInvalidCredentials();
    });

     // TEST CASE 007
    it('TC 007 - Login with invalid password', () => {
        LoginPage.disableCache()
        LoginPage.visit()
        LoginPage.waitForPageLoad()
        LoginPage.inputUsername(loginData.valid.username)
        LoginPage.inputPassword(loginData.invalid.password)
        LoginPage.interceptBeforeAction(
            loginData.endpoints.validateAuth,
            'validateAuth',
            'POST',
        )
        LoginPage.clickLoginButton()
        LoginPage.waitForIntercept('validateAuth', 5000)
        LoginPage.verifyStatusCode('validateAuth', 302)
        LoginPage.verifyInvalidCredentials();
    });

    // TEST CASE 008
    it('TC 008 - Login with empty username & password', () => {
        LoginPage.disableCache()
        LoginPage.visit()
        LoginPage.waitForPageLoad()
        LoginPage.interceptBeforeAction(
            loginData.endpoints.nunito600Font,
            'nunito600Font',
            'GET'
        )
        LoginPage.clickLoginButton()
        LoginPage.waitForIntercept('nunito600Font', 5000)
        LoginPage.verifyStatusCode('nunito600Font', 200)
        LoginPage.verifyBothRequiredErrors();
    });

    // TEST CASE 009
    it('TC 009 - Login with empty username', () => {
        LoginPage.disableCache()
        LoginPage.interceptBeforeAction(
            loginData.endpoints.chunkVendors,
            'chunkVendors',
            'GET'
        )
        LoginPage.visit()
        LoginPage.waitForIntercept('chunkVendors', 5000)
        LoginPage.verifyStatusCode('chunkVendors', 200)
        LoginPage.waitForPageLoad()
        LoginPage.inputPassword(loginData.valid.password)
        LoginPage.clickLoginButton()
        LoginPage.verifyRequiredFieldError('username');
    });

     // TEST CASE 010
    it('TC 010 - Login with empty password', () => {
        LoginPage.disableCache()
        LoginPage.interceptBeforeAction(
            loginData.endpoints.ohrmBranding,
            'ohrmBranding',
            'GET'
        )
        LoginPage.visit()
        LoginPage.waitForIntercept('ohrmBranding', 5000)
        LoginPage.verifyStatusCode('ohrmBranding', 200)
        LoginPage.waitForPageLoad()
        LoginPage.inputUsername(loginData.valid.username)
        LoginPage.clickLoginButton()
        LoginPage.verifyRequiredFieldError('password');
    });

    // TEST CASE 011
    it('TC 011 - Login with empty username & invalid password', () => {
        LoginPage.disableCache()
        LoginPage.interceptBeforeAction(
            loginData.endpoints.bootstrapIcons,
            'bootstrapIcons',
            'GET'
        )
        LoginPage.visit()
        LoginPage.waitForIntercept('bootstrapIcons', 5000)
        LoginPage.verifyStatusCode('bootstrapIcons', 200)
        LoginPage.waitForPageLoad()
        LoginPage.inputPassword(loginData.invalid.password)
        LoginPage.clickLoginButton()
        LoginPage.verifyRequiredFieldError('username');
    });

    // TEST CASE 012
    it('TC 012 - Login with empty password & invalid username', () => {
        LoginPage.disableCache()
        LoginPage.interceptBeforeAction(
            loginData.endpoints.loginAuth,
            'loginAuth',
            'GET'
        )
        LoginPage.visit()
        LoginPage.waitForIntercept('loginAuth', 5000)
        LoginPage.verifyStatusCode('loginAuth', 200)
        LoginPage.waitForPageLoad()
        LoginPage.inputUsername(loginData.invalid.username)
        LoginPage.clickLoginButton()
        LoginPage.verifyRequiredFieldError('password');
    });
});