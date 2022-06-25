const express = require('express')
const StockControls = require('../controllers/StockController')

// ? maybe verify token here

const stockRouter = express.Router()

stockRouter.get('/:ticker/news', StockControls.tickerNews)

stockRouter.get('/:ticker/prices', StockControls.tickerPrices)

module.exports = stockRouter