const Simulation = require('../models/SimulationModel')
const User = require('../models/UserModel')

const SimulationController = {
  addStock: async (req, res) => {
    console.log('adding stock');
    try {
      const newStock = await Simulation.create({
        stockTicker: req.body.ticker,
        amountOfShares: req.body.shares,
        // marketPrice: req.body.marketPrice,
        sharePrice: req.body.sharePrice,
        owner: req.user.id
      })

      console.log('new stock: ', newStock);
  
      const updatedUser = await User.findOneAndUpdate({_id: req.user.id}, {$push: {simulation: newStock._id}}, {new: true})
      console.log('updated User: ', updatedUser);
      return res.status(200).json({success: true, data: updatedUser})
    } catch (err) {
      return res.status(500).json({success: false, error: err})
    }
  },
  getAllStocks: async (req, res) => {
    try {
      if (req.user.id) {
        const simulation = await User.findOne({_id: req.user.id}).populate('simulation')
        return res.status(200).json({success: true, data: simulation.simulation})
      }
    } catch (err) {
      console.warn(err);
      return res.status(500).json({success: false, error: err})
    }
  },
  updateStock: async (req, res) => {
    try {
      const simulation = await Simulation.findById(req.params.id)
      if (simulation) {
        const query = {id: simulation._id}
        const newValue = {
          $set: {
            amountOfShares: req.body.shares,
            marketPrice: req.body.marketPrice,
            soldAt: req.body.soldAt
          }
        }
        const updatedValue = await Simulation.updateOne(query, newValue)
        return res.status(200).json(updatedValue)
      } else {
        return res.status(500).json({success: false, error: 'Simulation stock not found'})
      }
    } catch (err) {
      return res.status(500).json({success: false, error: err})
    }
  },
  deleteStock: async (req, res) => {
    try {
      const simulation = await Simulation.findById(req.params.id) // this will be the simulationed stock id

      if (!simulation) {
        return res.status(404).json({success: false, error: 'No stock found'})
      }

      await User.updateOne({_id: req.user.id}, {$pull: {simulation: simulation._id}})
      await simulation.remove()
      return res.status(200).json({success: true, data: "Stock deleted"})
    } catch (err) {
      return res.status(500).json({success: false, error: err})
    }
  }
}

module.exports = SimulationController