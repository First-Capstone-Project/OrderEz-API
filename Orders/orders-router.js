const express = require('express')
const logger = require('../src/logger')
const OrderService = require('./orders-service')
const xss = require('xss')
const path = require('path')
const { serialize } = require('v8')

const orderRouter = express.Router()
const bodyParser = express.json()

orderRouter
    .route('/orders')
    .post(bodyParser, (req, res, next) => {
        const { customer_id_fk } = req.body
        newOrder = { customer_id_fk }

        OrderService.insertOrder(req.app.get('db'), newOrder)
            .then(order => {
                res
                    .status(201)
                    .location(path.posix.join(req.originalUrl, `/${newOrder.id}`))
                    .json(order)
            })
            .catch(next)
    })
orderRouter
    .route('/newitem')
    .post(bodyParser, (req, res, next) => {
        const { item_id_fk, order_quantity, customer_id_fk } = req.body
        addItem = { item_id_fk, order_quantity, customer_id_fk }

        OrderService.addItem(req.app.get('db'), addItem)
            .then(add => {
                res
                    .status(201)
                    .location(path.posix.join(req.originalUrl, `/${addItem.id}`))
                    .json(add)
            })
            .catch(next)
    })
orderRouter
    .route('/reciept/:c_id')
    .get((req, res, next) => {
        const { c_id } = req.params
        OrderService.getReciept(req.app.get('db'), c_id)
            .then(reciept => {
                res
                .status(200)
                .json(reciept)
            })
            .catch(next)
    })
orderRouter
    .route('/get/:id')
    .get((req, res, next) => {
        const { id } = req.params
        OrderService.getCustomer(req.app.get('db'), id)
            .then(customer => {
                res.json(customer)
            })
            .catch(next)
    })
orderRouter
    .route('/active/:name')
    .get((req, res, next) => {
        const {name} = req.params
        OrderService.getAll(req.app.get('db'),name)
            .then(all => {
                res.json(all)
            })
            .catch(next)
    })
  

module.exports = orderRouter    