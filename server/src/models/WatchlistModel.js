const mongoose = require('mongoose')
const {Schema} = mongoose

const WatchlistSchema = {
  stockTicker: { // maybe needs to be unique
    type: String,
    trim: true,
  },
  alertPrice: {
    type: Number,
    default: 0
  },
  alerted: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
}

const Watchlist = mongoose.model('Watchlist', WatchlistSchema)
module.exports = Watchlist
