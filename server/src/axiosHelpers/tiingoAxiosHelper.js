const axios = require('axios')
const headers = require('../config/tiingoConfig')

const tiingoAxiosInstance = axios.create({
  baseURL: 'https://api.tiingo.com/tiingo/',
})

tiingoAxiosInstance.interceptors.request.use((req) => {
  req.headers = headers()

  return req
})

module.exports = tiingoAxiosInstance
