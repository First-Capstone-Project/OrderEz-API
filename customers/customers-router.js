const express = require('express')
const logger = require('../src/logger')
const CustomerServices = require('./customers-services')
const xss = require('xss')
const path = require('path')
const { serialize } = require('v8')

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
    .post(bodyParser, (req, res, next) => {
        const { customer_name, customer_adress, customer_phone } = req.body
        newCustomer = { customer_name, customer_adress, customer_phone }

        for (const field of ['customer_name', 'customer_adress', 'customer_phone']) {
            if (!req.body[field]) {
                logger.error(`${field} is required`)
                return res.status(400).send(`'${field}' is required`)
            }
        }
        CustomerServices.insertCustomer(req.app.get('db'), newCustomer)
            .then(customer => {
                res
                    .status(201)
                    .location(path.posix.join(req.originalUrl, `/${newCustomer.id}`))
                    .json(serializeCustomer(customer))
            })
            .catch(next)
    })

customersRouter
    .route('/customers/:customer_id')
    .get((req, res, next) => {
        const { customer_id } = req.params

        CustomerServices.getById(req.app.get('db'), customer_id)
            .then(customer => {
                if (!customer) {
                    logger.error(`Customer with id ${customer_id} not Found`)
                    return res.status(404).json({
                        error: { message: 'Customer not Found' }
                    })
                }
                res.json(serializeCustomer(customer))
            })
            .catch(next)
    })
    .patch(bodyParser,(req,res, next) =>{
        const { customer_id } = req.params
        CustomerServices.getById(req.app.get('db'), customer_id)
        .then(customer =>{
            if (!customer) {
                logger.error(`Customer with id ${customer_Id} not Found`)
                return res.status(404).json({
                    error: { message: 'Customer not Found' }
                })
            }
        })
        for (const field of ['customer_name', 'customer_adress', 'customer_phone']) {
            if (!req.body[field]) {
              logger.error(`${field} is required`)
              return res.status(400).send(`'${field}' is required`)
            }
        }
        const {customer_name, customer_adress, customer_phone} = req.body
        const newCustomer = {customer_name, customer_adress, customer_phone}

        CustomerServices.update(req.app.get('db'),customer_id, newCustomer)
        .then(res.status(204).end())
        .catch(next)
    })
    .delete((req, res, next) => {
        const { customer_id } = req.params
        CustomerServices.getById(req.app.get('db'), customer_id)
        .then(customer =>{
            if (!customer) {
                logger.error(`Customer with id ${customer_id} not Found`)
                return res.status(404).json({
                    error: { message: 'Customer not Found' }
                })
            } 
        })
        CustomerServices.delete(req.app.get('db'),customer_id)
        .then(() => {
            logger.info(`Customer with id ${customer_id} was deleted`)
            res.status(204).end()
        })
        .catch(next)

    })



        module.exports = customersRouter