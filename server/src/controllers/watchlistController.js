const Watchlist = require('../models/WatchlistModel')
const User = require('../models/UserModel')

const WatchlistController = {
  test: (req, res) => {
    console.log('test');
  },
  addStock: async (req, res) => {
    try {
      const newStock = await Watchlist.create({
        stockTicker: req.body.stockTicker,
        owner: req.user.id
      })

      const updatedUser = await User.findOneAndUpdate({_id: req.user.id}, {$push: {watchlist: newStock._id}}, {new: true})
      return res.status(200).json({success: true, data: updatedUser})
    } catch (err) {
      return res.status(500).json({success: false, error: err})
    }
  },
  getAllStocks: async (req, res) => {
    try {
      if (req.user.id) {
        const watchlist = await User.findOne({_id: req.user.id}).populate('watchlist')
        return res.status(200).json({success: true, data: watchlist.watchlist})
      } else {
        return res.status(400).json('not found') // do i need this
      }
    } catch (err) {
      console.warn(err);
      return res.status(500).json({success: false, error: err})
    }
  },
  // alertPrice / alerted can be updated here
  updateStock: async (req, res) => {
    console.log('updating stock');
    // const id = req.user.id
    const id = req.params.id // this will be the watchlisted stock id
    try {
      const watchlist = await Watchlist.findById(req.params.id)

      console.log('watchlist: ', watchlist);
      console.log('body: ', req.body);

      if (watchlist) {
        const query = {id: watchlist._id}
        const newValue = {$set: {alertPrice: req.body.alertPrice, alerted: req.body.alerted}}
        const updatedValue = await Watchlist.updateOne(query, newValue)

        console.log('updated value" ', updatedValue);
        return res.status(200).json(updatedValue)
      } else {
        return res.status(404).json({success: false, error: 'Watchlisted stock not found'})
      }
    } catch (err) {
      return res.status(500).json({success: false, error: err})
    }
  },
  deleteStock: async (req, res) => {
    try {
      const watchlist = await Watchlist.findById(req.params.id) // this will be the watchlisted stock id

      if (!watchlist) {
        return res.status(404).json({success: false, error: 'No stock found'})
      }

      await User.updateOne({_id: req.user.id}, {$pull: {watchlist: watchlist._id}})
      await watchlist.remove()
      return res.status(200).json({success: true, data: "Stock deleted"})
    } catch (err) {
      return res.status(500).json({success: false, error: err})
    }
  }
}

module.exports = WatchlistController