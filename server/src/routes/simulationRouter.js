const express = require('express')
const SimulationController = require('../controllers/SimulationController')
const verify = require('../utils/verifyToken')
const simulationRouter = express.Router()

simulationRouter.post('/addStock', verify, SimulationController.addStock)

simulationRouter.get('/allStocks', verify, SimulationController.getAllStocks)

simulationRouter.patch('/:id/update', verify, SimulationController.updateStock)

module.exports = simulationRouter