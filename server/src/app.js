// import logger from './middleware/logger'
// import { config } from 'dotenv'


require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectDB = require('./config/mongoConfig')
const userRouter = require('./routes/userRouter')
const stockRouter = require('./routes/stockRouter')
const watchlistRouter = require('./routes/watchlistRouter')
const simulationRouter = require('./routes/simulationRouter')

// config()

connectDB()

const app = express()

// init middleware
// app.use(logger);

// init cors
app.use(cors())

// Body Parser Middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// User API routes
app.use('/api/user', userRouter)

// Stock API routes
app.use('/api/stock', stockRouter)

app.use("/api/watchlist", watchlistRouter)

app.use('/api/simulation', simulationRouter)

const port = process.env.PORT || 3301

app.listen(port, () => {
  console.log(`server started on ${port}`)
})
