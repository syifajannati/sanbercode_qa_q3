describe('Reqres API Test Scenario', () => {
    const baseUrl = 'https://reqres.in/api'
    const authToken = 'reqres_1e1434fe6bae4a3c9cc0164af48ab365'
    const apiKey = 'reqres-free-v1'
    

    it('TC-001: List Users', () => {
        cy.request({
            method: 'GET',
            url: `${baseUrl}/users?page=2`,
            headers: {
                'x-api-key': authToken,
            }
        })
        .then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('page', 2);
            expect(response.body).to.have.property('per_page', 6);
            expect(response.body).to.have.property('total', 12);
            expect(response.body).to.have.property('total_pages', 2);
            expect(response.body.data).to.be.an('array').that.has.lengthOf(6);
        })
    });

    it('TC-002: Get Single User', () => {
        const userId = 2

        cy.request({
            method: 'GET',
            url: `${baseUrl}/users/${userId}`,
            headers: {
                'x-api-key': authToken,
            }
        }).then((response) => {
            // response verification
            expect(response.status).to.eq(200)

            // verify response body structure and data
            expect(response.body.data).to.have.property('id', userId)
            expect(response.body.data).to.have.property('email')
            expect(response.body.data).to.have.property('first_name')
            expect(response.body.data).to.have.property('last_name')
            expect(response.body.data).to.have.property('avatar')
            expect(response.body.support).to.exist
        })
    });

    it('TC-003: Get Single User Not Found', () => {
        const userId = 23
        
        cy.request({
            method: 'GET',
            url: `${baseUrl}/users/${userId}`,
            headers: {
                'x-api-key': authToken,
            },
            failOnStatusCode: false // prevent Cypress from failing the test on 4xx/5xx status codes
        }).then((response) => {
            // status code analysis
            expect(response.status).to.equal(404)
            expect(response.statusText).to.equal('Not Found')
            
            // response body analysis
            expect(response.body).to.be.empty
            expect(JSON.stringify(response.body)).to.equal('{}')
            
            // response time for error case
            expect(response.duration).to.be.lessThan(1000)
        })
    });

    it('TC-004: List <Resource>', () => {
        cy.request({
            method: 'GET',
            url: `${baseUrl}/unknown`,
            headers: {
                'x-api-key': authToken,
            },
        }).then((response) => {
            // response verification
            expect(response.status).to.eq(200)

            // verify response body structure and data
            expect(response.body).to.have.property('page', 1);
            expect(response.body).to.have.property('per_page', 6);
            expect(response.body).to.have.property('total', 12);
            expect(response.body).to.have.property('total_pages', 2);
            expect(response.body.data).to.be.an('array').that.has.lengthOf(6);

            // validate each item in array 
            response.body.data.forEach((item, index) => {
                // validate structure 
                expect(item).to.have.all.keys('id', 'name', 'year', 'color', 'pantone_value');
                
                // validate data types
                expect(item.id).to.be.a('number').and.to.be.greaterThan(0);
                expect(item.name).to.be.a('string').and.to.not.be.empty;
                expect(item.year).to.be.a('number');
                expect(item.color).to.be.a('string');
                expect(item.pantone_value).to.be.a('string');

                // specific value checks for certain items
                if (index === 0) {
                    expect(item.name).equal('cerulean')
                    expect(item.year).equal(2000)
                    expect(item.color).equal('#98B2D1')
                    expect(item.pantone_value).equal('15-4020')
                }
            })
        })
    });

    it('TC-005: Get Single <Resource>', () => {
        const resourceId = 2

        cy.request({
            method: 'GET',
            url: `${baseUrl}/unknown/${resourceId}`,
            headers: {
                'x-api-key': authToken,
            },
        }).then((response) => {
            // response verification
            expect(response.status).to.eq(200)

            // verify response body & data
            expect(response.body).to.have.property('data');
            expect(response.body.data.name).to.contain('rose');
            expect(response.body.data).to.have.property('year', 2001);
            expect(response.body.data).to.have.property('color', '#C74375');
            expect(response.body.data).to.have.property('pantone_value', '17-2031');
        })
    });

    it('TC-006: Get Single <Resource> Not Found', () => {
        const resourceId = 23
        cy.request({
            method: 'GET',
            url: `${baseUrl}/unknown/${resourceId}`,
            headers: {
                'x-api-key': authToken,
            },
            failOnStatusCode: false // prevent Cypress from failing the test on 4xx/5xx status codes
        }).then((response) => {
            // status code analysis
            expect(response.status).to.equal(404)
            expect(response.statusText).to.equal('Not Found')  

            // response body analysis
            expect(response.body).to.be.empty
            expect(JSON.stringify(response.body)).to.equal('{}')
        })
    });

    it('TC-007: Create', () => {
        cy.request({
            method: 'POST',
            url: `${baseUrl}/users`,
            headers: {
                'x-api-key': authToken,
            },
            body: {
                name: 'Syifa Jannati',
                job: 'Software Engineer'
            }
        }).then((response) => {
            // response verification
            expect(response.status).to.eq(201)

            // verify response body structure and data
            expect(response.body).to.have.property('name').that.equals('Syifa Jannati')
            expect(response.body.name).to.contain('Syifa')
            expect(response.body).to.have.property('job')
            expect(response.body).to.have.property('id').that.is.a('string').and.is.not.empty
            expect(response.body).to.have.property('createdAt').that.is.a('string').and.is.not.empty
        })
    });

    it('TC-008: Update', () => {
        const userId = 2

        cy.request({
            method: 'PUT',
            url: `${baseUrl}/users/${userId}`,
            headers: {
                'x-api-key': authToken,
            },
            body: {
                name: 'Syifa Jannati',
                job: 'Software Quality Engineer'
            }
        }).then((response) => {
            // response verification
            expect(response.status).to.eq(200)

            // verify response body structure and data
            expect(response.body).to.not.have.property('id')
            expect(response.body).to.have.property('name').that.equals('Syifa Jannati')
            expect(response.body).to.have.property('job').that.contain('Quality')
            expect(response.body).to.have.property('updatedAt').that.is.a('string').and.is.not.empty
        })
    });

    it('TC-009: Update', () => {
        const userId = 2
        cy.request({
            method: 'PATCH',
            url: `${baseUrl}/users/${userId}`,
            headers: {
                'x-api-key': authToken,
            },
            body: {
                job: 'Senior Software Quality Engineer'
            }
        }).then((response) => {
            // response verification
            expect(response.status).to.eq(200)  

            // verify response body structure and data
            expect(response.body).to.not.have.property('id')
            expect(response.body).to.have.property('job').that.equals('Senior Software Quality Engineer')
            expect(response.body).to.have.property('updatedAt').that.is.a('string').and.is.not.empty
        })
    });

    it('TC-010: Delete', () => {
        const userId = 2   
        cy.request({
            method: 'DELETE',
            url: `${baseUrl}/users/${userId}`,
            headers: {
                'x-api-key': authToken,
            },
        }).then((response) => {
            // response verification
            expect(response.status).to.eq(204)
            expect(response.body).to.be.empty
        })
    });

    
});