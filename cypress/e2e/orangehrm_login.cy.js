describe('Scenario Login OrangeHRM', () => {
  it('TC 001 - Login dengan username dan password yang valid', () => {
    // buka halaman orangehrm login
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')

    // get kolom input username
    // & input `Admin`
    cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input')
      .type('Admin')

    // get kolom input password
    // & input `admin123`
    cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input')
      .type('admin123')

    // get login button 
    // & click
    cy.get('.oxd-button').click()

    // memastikan user berada di halaman dashboard (berhasil login)
    cy.url().should('include', 'dashboard')
  });
})