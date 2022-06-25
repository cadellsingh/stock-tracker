const express = require('express')
const WatchlistControls = require('../controllers/WatchlistController')
const verify = require('../utils/verifyToken')
const watchlistRouter = express.Router()

// watchlistRouter.get('/watchlist', WatchlistControls.getAllStocks)

// watchlistRouter.post('/:id/addStock', WatchlistControls.addStock)
watchlistRouter.post('/addStock', verify, WatchlistControls.addStock)

// watchlistRouter.get('/:id/allStocks', WatchlistControls.getAllStocks)
watchlistRouter.get('/allStocks', verify, WatchlistControls.getAllStocks)


watchlistRouter.patch('/:id/update', verify, WatchlistControls.updateStock)

watchlistRouter.delete('/:id/delete', verify, WatchlistControls.deleteStock)

module.exports = watchlistRouter

// jwt converter online


// so pass verify here
// make sure and set headers on frontend