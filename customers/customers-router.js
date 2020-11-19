const express = require('express')
const logger = require('../src/logger')
const CustomerServices = require('./customers-services')
const xss = require('xss')
const path = require('path')
const { serialize } = require('v8')

const customersRouter = express.Router()
const bodyParser = express.json()


const serializeCustomer = customer => ({
    customer_id: customer.customer_id,
    customer_name: xss(customer.customer_name),
    customer_adress: xss(customer.customer_adress),
    customer_phone: xss(customer.customer_phone),
    customer_email: xss(customer.customer_email)
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
    customersRouter
    .route('/filter/:num')
    .get((req, res, next)=>{
        const {num} = req.params
        CustomerServices.filter(req.app.get('db'), num)
        .then(customer => {
            let array = customer.rows
            if (array.length === 0) {
                logger.error(`Customers with number ${num} not Found`)
                return res.status(404).json({
                    error: { message: 'Customers not Found' }
                })
            }
            res.json(customer.rows)
        })
        .catch(next)
    })



        module.exports = customersRouter