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
            .interceptBeforeAction(
                authData.endpoints.assets.doc.sendPasswordReset,
                'sendResetPasswordDoc',
                'GET'
            )
            .clickEnter(ForgotPasswordPage.getUsernameField())
            .waitForIntercept(
                'sendResetPasswordDoc',
                3000
            )
            .verifyStatusCode(
                'sendResetPasswordDoc',
                200
            )

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
            .interceptBeforeAction(
                authData.endpoints.assets.doc.reqResetPassword,
                'reqResetPassword',
                'POST'
            )
            .clickResetPasswordButton()
            .waitForIntercept(
                'reqResetPassword',
                3000
            )
            .verifyStatusCode(
                'reqResetPassword',
                302
            )
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
            .interceptBeforeAction(
                authData.endpoints.assets.styles.chunkVendorsCss,
                'chunkVendorsCss',
                'GET'
            )
            .clickEnter(ForgotPasswordPage.getUsernameField())
            .waitForIntercept(
                'chunkVendorsCss',
                3000
            )
            .verifyStatusCode(
                'chunkVendorsCss',
                200
            )
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
            .interceptBeforeAction(
                authData.endpoints.assets.scripts.appJs,
                'appJs',
                'GET'
            )
            .clickResetPasswordButton()
            .waitForIntercept(
                'appJs',
                3000
            )
            .verifyStatusCode(
                'appJs',
                200
            )
            .verifySendPasswordReset()
    });
    
    it('TC 005 - Reset with a case-insensitive username (uppercase) using Enter key', () => {
        LoginPage
            .disableCache()
            .visit()
            .waitForPageLoad()
            .interceptBeforeAction(
                authData.endpoints.assets.fonts.nunito600,
                'nunito600',
                'GET'
            )
            .clickForgotPassword()
            .waitForIntercept(
                'nunito600',
                3000
            )
            .verifyStatusCode(
                'nunito600',
                200
            )

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
            .interceptBeforeAction(
                authData.endpoints.assets.styles.bootstrapIcons,
                'bootstrapIcons',
                'GET'
            )
            .clickForgotPassword()
            .waitForIntercept(
                'bootstrapIcons',
                3000
            )
            .verifyStatusCode(
                'bootstrapIcons',
                200
            )

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
            .interceptBeforeAction(
                authData.endpoints.apis.messages,
                'messages',
                'GET'
            )
            .clickEnter(ForgotPasswordPage.getUsernameField())
            .waitForIntercept(
                'messages',
                3000
            )
            .verifyStatusCode(
                'messages',
                304
            )
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
            .interceptBeforeAction(
                authData.endpoints.assets.styles.appCss,
                'appCss',
                'GET'
            )
            .clickResetPasswordButton()
            .waitForIntercept(
                'appCss',
                3000
            )
            .verifyStatusCode(
                'appCss',
                200
            )
            .verifySendPasswordReset()
    });
    
    it('TC 009 - Reset with empty username using Enter key', () => {
        LoginPage
            .disableCache()
            .visit()
            .waitForPageLoad()
            .interceptBeforeAction(
                authData.endpoints.assets.scripts.chunkVendors,
                'chunkVendorsJs',
                'GET'
            )
            .clickForgotPassword()
            .waitForIntercept(
                'chunkVendorsJs',
                3000
            )
            .verifyStatusCode(
                'chunkVendorsJs',
                200
            )

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
            .interceptBeforeAction(
                authData.endpoints.assets.fonts.nunitoRegular,
                'nunitoRegular',
                'GET'
            )
            .clickForgotPassword()
            .waitForIntercept(
                'nunitoRegular',
                3000
            )
            .verifyStatusCode(
                'nunitoRegular',
                200
            )

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
            .interceptBeforeAction(
                authData.endpoints.assets.doc.reqPasswordResetCode,
                'reqPasswordResetCode',
                'GET'
            )
            .clickForgotPassword()
            .waitForIntercept(
                'reqPasswordResetCode',
                3000
            )
            .verifyStatusCode(
                'reqPasswordResetCode',
                200
            )

        ForgotPasswordPage
            .waitForPageLoad()
            .clickCancelButton()
            .verifyOnLogin()
    });
})