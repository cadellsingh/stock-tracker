// ! may need a new news for stocks api

const axios = require('axios')

// FOR COMPANY SEARCH USING TICKER
// ? this might stop working
// https://dev.to/yashwanth2804/ticker-search-api-34p5

// returns company name from ticker
// ex aapl -> Apple

// add error handling
// likewise with tickerNews
const companyName = async (ticker) => {
  return await axios
    .get(`https://ticker-2e1ica8b9.now.sh/keyword/${ticker}`)
    .then((res) => res.data[0].name.replace(/ .*/, ''))
}

const scrubData = (results) => {
  return results.map((result) => {
    return {
      title: result.title,
      link: result.link,
      author: result.creator,
      date: result.pubDate,
    }
  })
}

const tickerNews = async (ticker) => {
  try {
    const token = process.env.NEWS_DATA_API_TOKEN // ? NEWS_DATA_API_TOKEN
    const name = await companyName(ticker)

    const baseURL = `https://newsdata.io/api/1/news?apikey=${token}&q=${name}&language=en`

    // const results = await axios.get(baseURL).then((res) => res.data.results)
    let res = null
    await axios.get(baseURL).then((response) => {
      if (response.status === 200) {
        res = scrubData(response.data.results)
      }
    })

    return res

    // return scrubData(results)
  } catch (e) {
    throw e
  }
}

module.exports = tickerNews
