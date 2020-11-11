require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const errorHandler = require('./errorhandler')
const customersRouter = require('../customers/customers-router')
const itemsRouter = require('../Items/items-router')
const app = express()

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())
app.use(errorHandler)

app.use('/api',customersRouter)
app.use('/api',itemsRouter)

app.get('/', (req,res)=>{
    res.send('Hello, world!')
})


module.exports = app