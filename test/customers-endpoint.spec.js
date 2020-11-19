const { expect } = require('chai')
const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe('Customers Endpoints', function () {
    let db

    const {
        testcustomers
    } = helpers.makeFixtures()

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL,
        })
        app.set('db', db)
    })

    after('disconnect from db', () => db.destroy())

    before('cleanup', () => helpers.cleanTables(db))

    afterEach('cleanup', () => helpers.cleanTables(db))

    //Test for get all customers route
    //
    describe(`GET /api/customers`, () => {
        context(`Given no things`, () => {
            it(`responds with 200 and an empty list`, () => {
                return supertest(app)
                    .get('/api/customers')
                    .expect(200, [])
            })
        })

        context('Given there are customers in the database', () => {
            beforeEach('insert customers', () =>
                helpers.seedCustomersTables(
                    db,
                    testcustomers,
                )
            )
            
            it('Responds with 200 and all the customers',()=>{
                return supertest(app)
                .get('/api/customers')
                .expect(200,testcustomers)
            })
        })

    })

    //Test for specific customer Route
    //
    describe(`Get /api/customers/:customerID`,()=>{
        context(`Given no customer`, () => {
            it(`responds with 404`, () => {
              const customerID = 999
              return supertest(app)
                .get(`/api/customers/${customerID}`)
                .expect(404, { error: {'message':`Customer not Found`} })
            })
        })

        context('Given there is a specific customer',()=>{
            beforeEach('insert customers', () =>
                helpers.seedCustomersTables(
                    db,
                    testcustomers,
                )
            )
            it('Responds with 200 and all the customers',()=>{
                const customerID = 1
                return supertest(app)
                .get(`/api/customers/${customerID}`)
                .expect(200,testcustomers[customerID-1])
            })
        })

    })

    //Test for filtered customers
    //
    describe(`Get /api/filter/:num filtered customers`,()=>{
        context(`Given no customer`, () => {
            it(`responds with 404`, () => {
              const number = 999
              return supertest(app)
                .get(`/api/filter/${number}`)
                .expect(404, { error: {'message':`Customers not Found`} })
            })
        })
        context(`No customers with matching phone number`,()=>{
            beforeEach('insert customers', () =>
                helpers.seedCustomersTables(
                    db,
                    testcustomers,
                )
            )
            it(`responds with 404`, () => {
                const number = 999
                return supertest(app)
                  .get(`/api/filter/${number}`)
                  .expect(404, { error: {'message':`Customers not Found`} })
              })
        })
        context(`Customers found with matching number`,()=>{
            beforeEach('insert customers', () =>
                helpers.seedCustomersTables(
                    db,
                    testcustomers,
                )
            )
            it(`responds with 404`, () => {
                const number = 223
                return supertest(app)
                  .get(`/api/filter/${number}`)
                  .expect(200,testcustomers)
              })
        })

    })

    //Test for creating a customer
    //
    describe(`POST to /api/customers`,()=>{
        it(`creates new customer`,()=>{
            const newCustomer = { 
                customer_id: '3',
                customer_name : 'test3',
                customer_adress: 'Adress3', 
                customer_phone: '333',
                customer_email: 'email@email3.com',
            }
            return supertest(app)
            .post('/api/customers')
            .send(newCustomer)
            .expect(201)
            .expect(res =>{
                expect(res.body).to.have.property('customer_id')
                expect(res.body.customer_name).to.eql(newCustomer.customer_name)
            })
        })
    })

    //Test for updating customer
    //
    describe(`PATCH to /api/customers/:customerID`,()=>{
        context(`updates the customer`,()=>{
            beforeEach('insert customers', () =>
            helpers.seedCustomersTables(
                db,
                testcustomers,
            ))
            
            it(`updates the customer`,()=>{
                const newCustomer = { 
                    customer_name : 'test3',
                    customer_adress: 'Adress3', 
                    customer_phone: '333',
                    customer_email: 'email@email3.com',
                }
                return supertest(app)
                .patch(`/api/customers/1`)
                .send(newCustomer)
                .expect(204)
            })

        })
    })
})