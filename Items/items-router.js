const express = require('express')
const logger = require('../src/logger')
const ItemsServices = require('./items-services')
const xss = require('xss')
const path = require('path')
const { serialize } = require('v8')
const { route } = require('../customers/customers-router')


const itemsRouter = express.Router()
const bodyParser = express.json()

const serializeItem = item => ({
    id: item.item_id,
    name: xss(item.item_name),
    price: item.item_price,
    type: item.type_id_fk
})

const serializeType = type => ({
    id: type.type_id,
    name: xss(type.type_name)
})

itemsRouter
    .route('/items')
    .get((req, res, next) => {
        ItemsServices.getAllitems(req.app.get('db'))
            .then(items => {
                res.json(items.map(serializeItem))
            })
            .catch(next)
    })
    .post(bodyParser, (req, res, next) => {
        const { item_name, item_price, type_id_fk } = req.body
        newItem = { item_name, item_price, type_id_fk }

        for (const field of ['item_name', 'item_price', 'type_id_fk']) {
            if (!req.body[field]) {
                logger.error(`${field} is required`)
                return res.status(400).send(`'${field}' is required`)
            }
        }
        ItemsServices.insertItem(req.app.get('db'),newItem)
        .then(item => {
            res
            .status(201)
            .location(path.posix.join(req.originalUrl, `/${newItem.id}`))
            .json(serializeItem(item))
        })
        .catch(next)
    })

itemsRouter
    .route('/items/:item_id')
    .get((req, res, next) => {
        const { item_id } = req.params
        ItemsServices.getById(req.app.get('db'), item_id)
            .then(item => {
                if (!item) {
                    logger.error(`Item with id ${item_id} not Found`)
                    return res.status(404).json({
                        error: { message: 'Item not Found' }
                    })
                }
                res.json(serializeItem(item))
            })
            .catch(next)
    })

itemsRouter
    .route('/type/:type_id')
    .get((req, res, next) => {
        const { type_id } = req.params
        ItemsServices.getTypeId(req.app.get('db'), type_id)
            .then(type => {
                if (!type) {
                    logger.error(`Type with id ${type_id} not Found`)
                    return res.status(404).json({
                        error: { message: 'Type not Found' }
                    })
                }
                res.json(type)
            })
            .catch(next)
    })

itemsRouter
    .route('/types')
    .get((req, res, next) => {
        ItemsServices.getType(req.app.get('db'))
            .then(items => {
                res.json(items.map(serializeType))
            })
            .catch(next)
    })


module.exports = itemsRouter