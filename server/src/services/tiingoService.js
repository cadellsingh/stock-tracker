const tiingoAxiosInstance = require('../axiosHelpers/tiingoAxiosHelper')

const tickerPrices = async (ticker) => {
  try {
    const api = `daily/${ticker}/prices`

    let res = null
    await tiingoAxiosInstance(api).then((response) => {
      if (response.status === 200) {
        res = response.data
      }
    })

    return res
  } catch (e) {
    throw e
  }
}

module.exports = tickerPrices
