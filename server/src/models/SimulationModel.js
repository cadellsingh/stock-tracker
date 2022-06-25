const mongoose = require('mongoose')
const {Schema} = mongoose

const SimulationSchema = {
  stockTicker: {
    type: String,
    required: [true, 'Please enter a stock ticker'],
  },
  amountOfShares: Number,
  sharePrice: Number,
  // marketPrice: Number,
  soldAt: Number,
  // priceDifference: Number,
  // public: {
  //   type: Boolean,
  //   default: false,
  // },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
}

const Simulation = mongoose.model('Simulation', SimulationSchema)
module.exports = Simulation
