// ? this might be overkill


const headers = () => {
  const token = process.env.TIINGO_API_TOKEN

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Token ${token}`,
  }

  return headers
}

module.exports = headers
