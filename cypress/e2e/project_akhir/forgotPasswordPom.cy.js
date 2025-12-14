import LoginPage from '../../support/pageObjects/loginPage';
import ForgotPasswordPage from '../../support/pageObjects/forgotPasswordPage';
import authData from '../../fixtures/authData.json';


describe('Forgot Password Scenario with POM', () => {
    it('TC 001 - Reset with valid username using Enter key', () => {
        LoginPage
            .disableCache()
            .visit()
            .waitForPageLoad()
            .clickForgotPassword()
        ForgotPasswordPage
            .waitForPageLoad()
            .inputUsername(authData.users.valid.username)
            .clickEnter(ForgotPasswordPage.getUsernameField())
            .verifySendPasswordReset()
    });

    it('TC 002 - Reset with valid username using the Reset Password button', () => {
        LoginPage
            .disableCache()
            .visit()
            .waitForPageLoad()
            .clickForgotPassword()
        ForgotPasswordPage
            .waitForPageLoad()
            .inputUsername(authData.users.valid.username)
            .clickResetPasswordButton()
            .verifySendPasswordReset()
    });

    it('TC 003 - Reset with invalid username using Enter key', () => {
        LoginPage
            .disableCache()
            .visit()
            .waitForPageLoad()
            .clickForgotPassword()
        ForgotPasswordPage
            .waitForPageLoad()
            .inputUsername(authData.users.invalid.username)
            .clickEnter(ForgotPasswordPage.getUsernameField())
            .verifySendPasswordReset()
    });

    it('TC 004 - Reset with invalid username using the Reset Password button', () => {
        LoginPage
            .disableCache()
            .visit()
            .waitForPageLoad()
            .clickForgotPassword()
        ForgotPasswordPage
            .waitForPageLoad()
            .inputUsername(authData.users.invalid.username)
            .clickResetPasswordButton()
            .verifySendPasswordReset()
    });
    
    it('TC 005 - Reset with a case-insensitive username (uppercase) using Enter key', () => {
        LoginPage
            .disableCache()
            .visit()
            .waitForPageLoad()
            .clickForgotPassword()
        ForgotPasswordPage
            .waitForPageLoad()
            .inputUsername(authData.users.caseInsensitive.uppercase.username)
            .clickEnter(ForgotPasswordPage.getUsernameField())
            .verifySendPasswordReset()
    });
    
    it('TC 006 - Reset with a case-insensitive username (uppercase) using the Reset Password button', () => {
        LoginPage
            .disableCache()
            .visit()
            .waitForPageLoad()
            .clickForgotPassword()
        ForgotPasswordPage
            .waitForPageLoad()
            .inputUsername(authData.users.caseInsensitive.uppercase.username)
            .clickResetPasswordButton()
            .verifySendPasswordReset()
    });
    
    it('TC 007 - Reset with a case-insensitive username (lowercase) using Enter key', () => {
        LoginPage
            .disableCache()
            .visit()
            .waitForPageLoad()
            .clickForgotPassword()
        ForgotPasswordPage
            .waitForPageLoad()
            .inputUsername(authData.users.caseInsensitive.lowercase.username)
            .clickEnter(ForgotPasswordPage.getUsernameField())
            .verifySendPasswordReset()
    });
    
    it('TC 008 - Reset with a case-insensitive username (lowercase) using the Reset Password button', () => {
        LoginPage
            .disableCache()
            .visit()
            .waitForPageLoad()
            .clickForgotPassword()
        ForgotPasswordPage
            .waitForPageLoad()
            .inputUsername(authData.users.caseInsensitive.lowercase.username)
            .clickResetPasswordButton()
            .verifySendPasswordReset()
    });
    
    it('TC 009 - Reset with empty username using Enter key', () => {
        LoginPage
            .disableCache()
            .visit()
            .waitForPageLoad()
            .clickForgotPassword()
        ForgotPasswordPage
            .waitForPageLoad()
            .clickEnter(ForgotPasswordPage.getUsernameField())
            .verifyRequiredFieldError()
    });
    
    it('TC 010 - Reset with empty username using the Reset Password button', () => {
        LoginPage
            .disableCache()
            .visit()
            .waitForPageLoad()
            .clickForgotPassword()
        ForgotPasswordPage
            .waitForPageLoad()
            .clickResetPasswordButton()
            .verifyRequiredFieldError()
    });

    it('TC 011 - Cancel reset password', () => {
        LoginPage
            .disableCache()
            .visit()
            .waitForPageLoad()
            .clickForgotPassword()
        ForgotPasswordPage
            .waitForPageLoad()
            .clickCancelButton()
            .verifyOnLogin()
    });
})