describe('Scenario Login OrangeHRM', () => {
  // TEST CASE 001
  it('TC 001 - Login menggunakan username dan password yang valid dengan klik Enter', () => {
    // buka halaman orangehrm login
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')

    // get kolom input username
    // & input `Admin`
    cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input')
      .type('Admin')

    // get kolom input password
    // then input `admin123`
    // then click Enter
    cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input')
      .type('admin123{enter}')

    // memastikan user berada di halaman dashboard (berhasil login)
    cy.url().should('include', 'dashboard')
  });

  // TEST CASE 002
  it('TC 002 - Login menggunakan username dan password yang valid dengan klik Login', () => {
    // buka halaman orangehrm login
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')

    // get kolom input username
    // & input `Admin`
    cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input')
      .type('Admin')

    // get kolom input password
    // then input `admin123`
    cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input')
      .type('admin123')

    // get login button 
    // & click Login
    cy.get('.oxd-button').click()

    // memastikan user berada di halaman dashboard (berhasil login)
    cy.url().should('include', 'dashboard')
  });
})