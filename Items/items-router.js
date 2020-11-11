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
    type: item.type_name
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
    .get((req,res,next) =>{
        const {type_id} = req.params
        ItemsServices.getTypeId(req.app.get('db'),type_id)
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


        module.exports = itemsRouter