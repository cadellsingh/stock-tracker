const tickerNews = require('../services/newsDataService')
const tickerPrices = require('../services/tiingoService')

const StockController = {
  // @desc returns news articles on a certain stock
  // @route GET /api/stock/:ticker/news
  // @private
  tickerNews: async (req, res) => {
    try {
      const data = await tickerNews(req.params.ticker)

      res.status(200).json({success: true, data})
    } catch (err) {
      res.status(400).json({success: false, error: err})
    }
  },

  // @desc returns price info on a certain stock
  // @route GET /api/stock/:ticker/prices
  // @private
  tickerPrices: async (req, res) => {
    try {
      const data = await tickerPrices(req.params.ticker)
      res.status(200).json({success: true, data: data[0]})
    } catch (err) {
      res.status(400).json({success: false, error: err})
    }
  }
}

module.exports = StockController