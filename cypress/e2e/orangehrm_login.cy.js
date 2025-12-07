describe('Scenario Login OrangeHRM', () => {
  // TEST CASE 001
  it('TC 001 - Login menggunakan username dan password yang valid dengan klik Enter', () => {
    // buka halaman orangehrm login
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')

    // get kolom input username
    // & input `Admin`
    // cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input')
    //   .type('Admin')
    cy.get("input[placeholder='Username']")
      .type('Admin')

    // get kolom input password
    // then input `admin123`
    // then click Enter
    // cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input')
    //   .type('admin123{enter}')
    cy.get("input[placeholder='Password']")
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
    cy.get("input[placeholder='Username']")
      .type('Admin')

    // get kolom input password
    // then input `admin123`
    cy.get("input[placeholder='Password']")
      .type('admin123')

    // get login button 
    // & click Login
    cy.get('.oxd-button').click()

    // memastikan user berada di halaman dashboard (berhasil login)
    cy.url().should('include', 'dashboard')
  });

  // TEST CASE 003
  it('TC 003 - Login menggunakan username dan password yang tidak valid dengan klik Enter', () => {
    // buka halaman orangehrm login
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')

    // get kolom input username
    // & input `admin123`
    cy.get("input[placeholder='Username']")
      .type('admin123')

    // get kolom input password
    // then input `Admin`
    // then click Enter
    cy.get("input[placeholder='Password']")
      .type('Admin{enter}')

    // tunggu hingga alert muncul, lalu periksa kontennya
    // memastikan ada `Invalid credentials` pada alert
    // (tidak berhasil login)
    cy.get('.oxd-alert-content', { timeout: 10000 }) // timeout opsional, menunggu hingga 10 detik
      .should('be.visible')
      .and('contain', 'Invalid credentials')
  });

  // TEST CASE 004
  it('TC 004 - Login menggunakan username dan password yang tidak valid dengan klik Login', () => {
    // buka halaman orangehrm login
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')

    // get kolom input username
    // & input `admin123`
    cy.get("input[placeholder='Username']")
      .type('admin123')

    // get kolom input password
    // then input `Admin`
    cy.get("input[placeholder='Password']")
      .type('Admin')

    // get login button 
    // & click Login
    cy.get('.oxd-button').click()

    // tunggu hingga alert muncul, lalu periksa kontennya
    // memastikan ada `Invalid credentials` pada alert
    // (tidak berhasil login)
    cy.get('.oxd-alert-content', { timeout: 10000 }) // timeout opsional, menunggu hingga 10 detik
      .should('be.visible')
      .and('contain', 'Invalid credentials')
  });

  // TEST CASE 005
  it('TC 005 - Login menggunakan username dengan case insensitive', () => {
    // buka halaman orangehrm login
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')

    // get kolom input username
    // & input `admin`
    cy.get("input[placeholder='Username']")
      .type('admin')

    // get kolom input password
    // then input `admin123`
    cy.get("input[placeholder='Password']")
      .type('admin123')

    // get login button 
    // & click Login
    cy.get('.oxd-button').click()

    // memastikan user berada di halaman dashboard (berhasil login)
    cy.url().should('include', 'dashboard')
  });
})