const express = require('express')
const logger = require('../src/logger')
const CustomerServices = require('./customers-services')
const xss = require('xss')
const path = require('path')

const customersRouter = express.Router()
const bodyParser = express.json()

const serializeCustomer = customer => ({
    id: customer.customer_id,
    name: xss(customer.customer_name),
    adress: xss(customer.customer_adress),
    phone: xss(customer.customer_phone),
    email: xss(customer.customer_email)
})

customersRouter
    .route('/customers')
    .get((req, res, next) => {
        CustomerServices.getAllCustomers(req.app.get('db'))
            .then(customers => {
                res.json(customers.map(serializeCustomer))
            })
            .catch(next)
    })

module.exports = customersRouter