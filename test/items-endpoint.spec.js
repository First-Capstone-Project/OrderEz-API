const { expect } = require('chai')
const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe('Items Endpoints', function () {
    let db

    const {
        testitems,
        testtypes
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

    //Test for get all items route
    //
    describe(`GET /api/items`, () => {
        context(`Given no items`, () => {
            it(`responds with 200 and an empty list`, () => {
                return supertest(app)
                    .get('/api/items')
                    .expect(200, [])
            })
        })

        context('Given there are items in the database', () => {
            beforeEach('insert items', () =>{
                helpers.seedTypesTables(
                    db,
                    testtypes
                )
                helpers.seedItemsTables(
                    db,
                    testitems,
                )
            })

            it('Responds with 200 and all the items', () => {
                return supertest(app)
                    .get('/api/items')
                    .expect(200)
            })
        })

    })

    //Test for get all types route
    //
    describe(`GET /api/types`, () => {
        context(`Given no types`, () => {
            it(`responds with 200 and an empty list`, () => {
                return supertest(app)
                    .get('/api/types')
                    .expect(200, [])
            })
        })

        context('Given there are types in the database', () => {
            beforeEach('insert types', () =>{
                helpers.seedTypesTables(
                    db,
                    testtypes
                )
            })

            it('Responds with 200 and all the types', () => {
                return supertest(app)
                    .get('/api/types')
                    .expect(200)
            })
        })

    })

    //Test for specific items route
    //
    describe(`Get /api/items/:itemID`,()=>{
        context(`Given no item`, () => {
            it(`responds with 404`, () => {
              const itemID = 999
              return supertest(app)
                .get(`/api/items/${itemID}`)
                .expect(404, { error: {'message':`Item not Found`} })
            })
        })

        context('Given there is a specific item',()=>{
            beforeEach('insert items', () =>{
                helpers.seedTypesTables(
                    db,
                    testtypes
                )
                helpers.seedItemsTables(
                    db,
                    testitems,
                )
            })
            it('Responds with 200 and all the items',()=>{
                return supertest(app)
                .get(`/api/items/${1}`)
                .expect(404)
            })
        })

    })

})