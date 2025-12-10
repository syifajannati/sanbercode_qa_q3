describe('Scenario Login OrangeHRM', () => {

  // TEST CASE 001
  it('TC 001 - Valid login dengan Enter (intercept dashboard API)', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')

    cy.get("input[placeholder='Username']", 
      { timeout: 10000 }).should('be.visible')

    cy.get("input[placeholder='Username']")
      .type('Admin')

    cy.get("input[placeholder='Password']")
      .type('admin123')

    // intercept API dashboard sebelum Enter
    cy.intercept('GET', '**/api/v2/dashboard/employees/time-at-work**')
      .as('timeAtWork')

    cy.get("input[placeholder='Password']")
      .type('{enter}')

    cy.wait('@timeAtWork').its('response.statusCode').should('eq', 200)

    cy.url().should('include', 'dashboard')
  });

  // TEST CASE 002
  it('TC 002 - Valid login dengan button (intercept orange.png)', () => {
    // 1. DISABLE CACHE via automation
    Cypress.automation('remote:debugger:protocol', {
      command: 'Network.setCacheDisabled',
      params: { cacheDisabled: true }
    })

    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')

    cy.get("input[placeholder='Username']", 
      { timeout: 10000 }).should('be.visible')

    cy.get("input[placeholder='Username']")
      .type('Admin')

    cy.get("input[placeholder='Password']")
      .type('admin123')

    // intercept image orange sebelum klik login
    cy.intercept('GET', '**/web/images/orange.png**').as('orangeImage')

    cy.get('.oxd-button').click()

    cy.wait('@orangeImage', { timeout: 5000 })
      .its('response.statusCode').should('eq', 200)

    cy.url().should('include', 'dashboard')
  });

  // TEST CASE 003
  it('TC 003 - Invalid login dengan Enter (intercept app.css)', () => {
    // 1. DISABLE CACHE via automation
    Cypress.automation('remote:debugger:protocol', {
      command: 'Network.setCacheDisabled',
      params: { cacheDisabled: true }
    })

    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')

    cy.get("input[placeholder='Username']", 
      { timeout: 10000 }).should('be.visible')

    cy.get("input[placeholder='Username']")
      .type('admin123')

    cy.get("input[placeholder='Password']")
      .type('Admin')

    // intercept CSS app sebelum Enter
    cy.intercept('GET', '**/css/app.css**').as('stylesheet')

    cy.get("input[placeholder='Password']")
      .type('{enter}')

    cy.wait('@stylesheet', { timeout: 5000 })
      .its('response.statusCode').should('eq', 200)

    cy.get('.oxd-alert-content', { timeout: 10000 })
      .should('be.visible')
      .and('contain', 'Invalid credentials')
  });

  // TEST CASE 004
  it('TC 004 - Invalid login dengan button (intercept nunito font)', () => {
    // 1. DISABLE CACHE via automation
    Cypress.automation('remote:debugger:protocol', {
      command: 'Network.setCacheDisabled',
      params: { cacheDisabled: true }
    })

    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')

    cy.get("input[placeholder='Username']", 
      { timeout: 10000 }).should('be.visible')

    cy.get("input[placeholder='Username']")
      .type('admin123')

    cy.get("input[placeholder='Password']")
      .type('Admin')

    // intercept font nunio-regular sebelum klik login
    cy.intercept('GET', '**/fonts/nunito-sans-v6-latin-ext_latin-regular.woff2').as('nunitoFont')

    cy.get('.oxd-button').click()
    
    cy.wait('@nunitoFont', { timeout: 5000 })
      .its('response.statusCode').should('eq', 200)

    cy.get('.oxd-alert-content', { timeout: 10000 })
      .should('be.visible')
      .and('contain', 'Invalid credentials')
  });

  // TEST CASE 005
  it('TC 005 - Case insensitive login (intercept app.js)', () => {
    // 1. DISABLE CACHE via automation
    Cypress.automation('remote:debugger:protocol', {
      command: 'Network.setCacheDisabled',
      params: { cacheDisabled: true }
    })

    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')

    cy.get("input[placeholder='Username']", 
      { timeout: 10000 }).should('be.visible')

    cy.get("input[placeholder='Username']")
      .type('admin')

    cy.get("input[placeholder='Password']")
      .type('admin123')

    // intercept app js sebelum klik login
    cy.intercept('GET', '**/js/app.js**').as('appJs')

    cy.get('.oxd-button').click()
    
    cy.wait('@appJs', { timeout: 5000 })
      .its('response.statusCode').should('eq', 200)

    cy.url().should('include', 'dashboard')
  });

  // TEST CASE 006
  it('TC 006 - Invalid username only (intercept messages API)', () => {
    // 1. DISABLE CACHE via automation
    Cypress.automation('remote:debugger:protocol', {
      command: 'Network.setCacheDisabled',
      params: { cacheDisabled: true }
    })

    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')

    cy.get("input[placeholder='Username']", 
      { timeout: 10000 }).should('be.visible')

    cy.get("input[placeholder='Username']")
      .type('test')

    cy.get("input[placeholder='Password']")
      .type('admin123')

    // intercept messages sebelum klik login
    cy.intercept('GET', '**/messages').as('messages')

    cy.get('.oxd-button').click()

    cy.wait('@messages', { timeout: 5000 })
      .its('response.statusCode').should('eq', 304)

    cy.get('.oxd-alert-content', { timeout: 10000 })
      .should('be.visible')
      .and('contain', 'Invalid credentials')
  });

  // TEST CASE 007
  it('TC 007 - Invalid password only (intercept validate API)', () => {
    // 1. DISABLE CACHE via automation
    Cypress.automation('remote:debugger:protocol', {
      command: 'Network.setCacheDisabled',
      params: { cacheDisabled: true }
    })

    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')

    cy.get("input[placeholder='Username']", 
      { timeout: 10000 }).should('be.visible')

    cy.get("input[placeholder='Username']")
      .type('Admin')

    cy.get("input[placeholder='Password']")
      .type('admin')

    // intercept API validate sebelum klik login
    cy.intercept('POST', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate')
      .as('validateAuth')

    cy.get('.oxd-button').click()

    cy.wait('@validateAuth', { timeout: 5000 })
      .its('response.statusCode').should('eq', 302)

    cy.get('.oxd-alert-content', { timeout: 10000 })
      .should('be.visible')
      .and('contain', 'Invalid credentials')
  });

  // TEST CASE 008
  it('TC 008 - Empty username & password (intercept nunito-600 font)', () => {
    // 1. DISABLE CACHE via automation
    Cypress.automation('remote:debugger:protocol', {
      command: 'Network.setCacheDisabled',
      params: { cacheDisabled: true }
    })

    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')

    cy.get("input[placeholder='Username']", 
      { timeout: 10000 }).should('be.visible')

    // intercept font nunito 600 sebelum klik login
    cy.intercept('GET', '**/fonts/nunito-sans-v6-latin-ext_latin-600.woff2')
      .as('nunito600Font')

    cy.get('.oxd-button').click()
    
    cy.wait('@nunito600Font', { timeout: 5000 })
      .its('response.statusCode').should('eq', 200)

    cy.get(':nth-child(2) > .oxd-input-group > .oxd-text', { timeout: 10000 })
      .should('be.visible')
      .and('contain', 'Required')

    cy.get(':nth-child(3) > .oxd-input-group > .oxd-text', { timeout: 10000 })
      .should('be.visible')
      .and('contain', 'Required')
  });

  // TEST CASE 009
  it('TC 009 - Empty username only (intercept chunk-vendors.js)', () => {
    // 1. DISABLE CACHE via automation
    Cypress.automation('remote:debugger:protocol', {
      command: 'Network.setCacheDisabled',
      params: { cacheDisabled: true }
    })

    // intercept chunk-vendors sebelum membuka halaman login
    cy.intercept('GET', '**chunk-vendors.js**').as('chunkVendors')

    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')

    cy.wait('@chunkVendors', { timeout: 5000 })
      .its('response.statusCode').should('eq', 200)

    cy.get("input[placeholder='Username']", 
      { timeout: 10000 }).should('be.visible')

    cy.get("input[placeholder='Password']")
      .type('admin123')

    cy.get('.oxd-button').click()    

    cy.get(':nth-child(2) > .oxd-input-group > .oxd-text', { timeout: 10000 })
      .should('be.visible')
      .and('contain', 'Required')
  });

  // TEST CASE 010
  it('TC 010 - Empty password only (intercept ohrm_branding.png)', () => {
    // 1. DISABLE CACHE via automation
    Cypress.automation('remote:debugger:protocol', {
      command: 'Network.setCacheDisabled',
      params: { cacheDisabled: true }
    })

    // intercept ohrm_branding image sebelum membuka halaman login
    cy.intercept('GET', '**ohrm_branding.png**').as('ohrmBranding')

    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')

    cy.wait('@ohrmBranding', { timeout: 5000 })
      .its('response.statusCode').should('eq', 200)

    cy.get("input[placeholder='Username']", 
      { timeout: 10000 }).should('be.visible')

    cy.get("input[placeholder='Username']")
      .type('Admin')

    cy.get('.oxd-button').click()
    
    cy.get(':nth-child(3) > .oxd-input-group > .oxd-text', { timeout: 10000 })
      .should('be.visible')
      .and('contain', 'Required')
  });

  // TEST CASE 011
  it('TC 011 - Empty username + invalid password (intercept bootstrap-icons)', () => {
    // 1. DISABLE CACHE via automation
    Cypress.automation('remote:debugger:protocol', {
      command: 'Network.setCacheDisabled',
      params: { cacheDisabled: true }
    })

    // intercept bootstrap icons sebelum membuka halaman login
    cy.intercept('GET', '**/fonts/bootstrap-icons.woff2').as('bootstrapIcons')

    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')

    cy.wait('@bootstrapIcons', { timeout: 5000 })
      .its('response.statusCode').should('eq', 200)

    cy.get("input[placeholder='Username']", 
      { timeout: 10000 }).should('be.visible')

    cy.get("input[placeholder='Password']")
      .type('test')

    cy.get('.oxd-button').click()
    
    cy.get(':nth-child(2) > .oxd-input-group > .oxd-text', { timeout: 10000 })
      .should('be.visible')
      .and('contain', 'Required')
  });

  // TEST CASE 012
  it('TC 012 - Empty password + invalid username (intercept login page)', () => {
    // 1. DISABLE CACHE via automation
    Cypress.automation('remote:debugger:protocol', {
      command: 'Network.setCacheDisabled',
      params: { cacheDisabled: true }
    })

    // intercept halaman login sebelum membuka halaman login
    cy.intercept('GET', '**/index.php/auth/login').as('loginAuth')
    
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')

    cy.wait('@loginAuth', { timeout: 5000 })
      .its('response.statusCode').should('eq', 200)

    cy.get("input[placeholder='Username']", 
      { timeout: 10000 }).should('be.visible')

    cy.get("input[placeholder='Username']")
      .type('test')

    cy.get('.oxd-button').click()
    
    cy.get(':nth-child(3) > .oxd-input-group > .oxd-text', { timeout: 10000 })
      .should('be.visible')
      .and('contain', 'Required')
  });
})