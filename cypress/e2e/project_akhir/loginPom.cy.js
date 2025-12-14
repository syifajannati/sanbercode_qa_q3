import LoginPage from '../../support/pageObjects/loginPage.js';
import authData from '../../fixtures/authData.json';


describe('Login Scenario with POM', () => {
    it('TC 001 - Login with valid username & password using Enter key', () => {
        LoginPage
            .visit()
            .waitForPageLoad()
            .inputUsername(authData.users.valid.username)
            .inputPassword(authData.users.valid.password)
            .interceptBeforeAction(
                authData.endpoints.apis.timeAtWork, 
                'timeAtWork')
            .clickEnter(LoginPage.getPasswordField())
            .waitForIntercept('timeAtWork', 10000)
            .verifyStatusCode('timeAtWork', 200)
            .verifyOnDashboard()
    });
    
    it('TC 002 - Login with valid username & password using the login button', () => {
        LoginPage
            .disableCache()
            .visit()
            .waitForPageLoad()
            .inputUsername(authData.users.valid.username)
            .inputPassword(authData.users.valid.password)
            .interceptBeforeAction(
                authData.endpoints.assets.images.orangeImage, 
                'orangeImage')
            .clickLoginButton()
            .waitForIntercept('orangeImage', 5000)
            .verifyStatusCode('orangeImage', 200)
            .verifyOnDashboard()
    });

    it('TC 003 - Login with invalid username & password using Enter key', () => {
        LoginPage
            .disableCache()
            .visit()   
            .waitForPageLoad()
            .inputUsername(authData.users.invalid.username)
            .inputPassword(authData.users.invalid.password)
            .interceptBeforeAction(
                authData.endpoints.assets.styles.appCss, 
                'appCss', 
                'GET')
            .clickEnter(LoginPage.getPasswordField())
            .waitForIntercept('appCss', 5000)
            .verifyStatusCode('appCss', 200)
            .verifyInvalidCredentials()
    });

    // TEST CASE 004
    it('TC 004 - Login with invalid username & password using the login button', () => {
        LoginPage
            .disableCache()
            .visit()
            .waitForPageLoad()
            .inputUsername(authData.users.invalid.username)
            .inputPassword(authData.users.invalid.password)
            .interceptBeforeAction(
                authData.endpoints.assets.fonts.nunitoRegular,
                'nunitoRegular',
                'GET'
            )
            .clickLoginButton()
            .waitForIntercept('nunitoRegular', 5000)
            .verifyStatusCode('nunitoRegular', 200)
            .verifyInvalidCredentials();
    });

    // TEST CASE 005
    it('TC 005 - Login with a case-insensitive username', () => {
        LoginPage
            .disableCache()
            .visit()
            .waitForPageLoad()
            .inputUsername(authData.users.caseInsensitive.lowercase.username)
            .inputPassword(authData.users.valid.password)
            .interceptBeforeAction(
                authData.endpoints.assets.scripts.appJs,
                'appJs',
                'GET'
            )
            .clickLoginButton()
            .waitForIntercept('appJs', 5000)
            .verifyStatusCode('appJs', 200)
            .verifyOnDashboard();
    });

    // TEST CASE 006
    it('TC 006 - Login with invalid username', () => {
        LoginPage
            .disableCache()
            .visit()
            .waitForPageLoad()
            .inputUsername(authData.users.invalid.username)
            .inputPassword(authData.users.valid.password)
            .interceptBeforeAction(
                authData.endpoints.apis.messages,
                'messages',
                'GET',
            )
            .clickLoginButton()
            .waitForIntercept('messages', 5000)
            .verifyStatusCode('messages', 304)
            .verifyInvalidCredentials();
    });

     // TEST CASE 007
    it('TC 007 - Login with invalid password', () => {
        LoginPage
            .disableCache()
            .visit()
            .waitForPageLoad()
            .inputUsername(authData.users.valid.username)
            .inputPassword(authData.users.invalid.password)
            .interceptBeforeAction(
            authData.endpoints.assets.doc.validate,
                'validate',
                'POST',
            )
            .clickLoginButton()
            .waitForIntercept('validate', 5000)
            .verifyStatusCode('validate', 302)
            .verifyInvalidCredentials();
    });

    // TEST CASE 008
    it('TC 008 - Login with empty username & password', () => {
        LoginPage
            .disableCache()
            .visit()
            .waitForPageLoad()
            .interceptBeforeAction(
                authData.endpoints.assets.fonts.nunito600,
                'nunito600',
                'GET'
            )
            .clickLoginButton()
            .waitForIntercept('nunito600', 5000)
            .verifyStatusCode('nunito600', 200)
            .verifyBothRequiredErrors();
    });

    // TEST CASE 009
    it('TC 009 - Login with empty username', () => {
        LoginPage
            .disableCache()
            .interceptBeforeAction(
            authData.endpoints.assets.scripts.chunkVendors,
                'chunkVendors',
                'GET'
            )
            .visit()
            .waitForIntercept('chunkVendors', 5000)
            .verifyStatusCode('chunkVendors', 200)
            .waitForPageLoad()
            .inputPassword(authData.users.valid.password)
            .clickLoginButton()
            .verifyRequiredFieldError('username');
    });

     // TEST CASE 010
    it('TC 010 - Login with empty password', () => {
        LoginPage
            .disableCache()
            .interceptBeforeAction(
                authData.endpoints.assets.images.ohrmBranding,
                'ohrmBranding',
                'GET'
            )
            .visit()
            .waitForIntercept('ohrmBranding', 5000)
            .verifyStatusCode('ohrmBranding', 200)
            .waitForPageLoad()
            .inputUsername(authData.users.valid.username)
            .clickLoginButton()
            .verifyRequiredFieldError('password');
    });

    // TEST CASE 011
    it('TC 011 - Login with empty username & invalid password', () => {
        LoginPage
            .disableCache()
            .interceptBeforeAction(
                authData.endpoints.assets.styles.bootstrapIcons,
                'bootstrapIcons',
                'GET'
            )
            .visit()
            .waitForIntercept('bootstrapIcons', 5000)
            .verifyStatusCode('bootstrapIcons', 200)
            .waitForPageLoad()
            .inputPassword(authData.users.invalid.password)
            .clickLoginButton()
            .verifyRequiredFieldError('username');
    });

    // TEST CASE 012
    it('TC 012 - Login with empty password & invalid username', () => {
        LoginPage
            .disableCache()
            .interceptBeforeAction(
                authData.endpoints.assets.doc.login,
                'login',
                'GET'
            )
            .visit()
            .waitForIntercept('login', 5000)
            .verifyStatusCode('login', 200)
            .waitForPageLoad()
            .inputUsername(authData.users.invalid.username)
            .clickLoginButton()
            .verifyRequiredFieldError('password');
    });
});