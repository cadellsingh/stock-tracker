const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(password, salt)
}

const generateJWT = (id) => {
  return jwt.sign({id}, process.env.SECRET_TOKEN)
}



module.exports = {hashPassword, generateJWT}