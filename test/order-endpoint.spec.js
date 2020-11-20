const { expect } = require('chai')
const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe('Customers Endpoints', function () {
    let db

    const {
        testcustomers,
        testitems,
        testtypes,
        testorders
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

    //Test for creating an order
    //
    describe(`POST to /api/orders`, () => {
        context(`create new Order`, () => {
            beforeEach('insert customers', () =>
                helpers.seedCustomersTables(
                    db,
                    testcustomers,
                )
            )
            it(`creates new Order`, () => {

                const newOrder = {
                    order_customer_id: '1',
                    customer_id_fk: '1',
                }
                return supertest(app)
                    .post('/api/orders')
                    .send(newOrder)
                    .expect(201)
                    .expect(res => {
                        expect(res.body).to.have.property('order_customer_id')
                    })
            })
        })
    })

        

   

})