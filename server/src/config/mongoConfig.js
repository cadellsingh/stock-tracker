const mongoose = require('mongoose')

const connectDB = async () => {
  const uri = process.env.MONGO_URI

  try {
    const conn = await mongoose.connect(uri)
    console.log(`MongoDB connected: ${conn.connection.host}`)
  } catch (err) {
    console.log(err)
  }
}

module.exports = connectDB
