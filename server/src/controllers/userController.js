// ! remember to change the comments description when AUTH HEADER is implemented
// ! going to be using req.user instead of req.params

// LOOK AT JOI FOR VALIDATING DATA
// HANDLES CRUD FOR USER
// create a service and handle all the business logic of API call in the service then just return the value back to controller.

const User = require('../models/UserModel')
const bcrypt = require('bcrypt')
const {hashPassword, generateJWT} = require('../utils/generalHelpers')

const UserController = {
  // @desc gets user information (does not return watchlist or simulated stocks)
  // @route GET /api/user/get
  // @private
  getUser: async (req, res) => {
    console.log('getting user');
    try {
      const user = await User.findById(req.user.id)

      return res.status(200).json({
        success: true,
        data: user
      })

    } catch (err) {
      return res.status(500).json({success: false, error: err})
    }
  },

  // @desc creates new user
  // @route POST /api/user/register
  // @private
  createUser: async (req, res) => {
    console.log('creating user');

    try {
      const emailExists = await User.findOne({
        email: req.body.email,
      })

      if (emailExists) {
        return res.status(400).json({
          success: false,
          error: 'That email is already registered',
        })
      }

      // const usernameExists = await User.findOne({username: req.body.username})

      // if (usernameExists) {
      //   return res.status(400).json({
      //     success: false,
      //     error: 'That username is already registered',
      //   })
      // }

      // Hash password
      // const salt = await bcrypt.genSalt(10)
      // const hashedPassword = await bcrypt.hash(req.body.password, salt)

      // Hash password
      const hashedPassword = await hashPassword(req.body.password)

      const newUser = await User.create({
        email: req.body.email,
        // email: 'delly-9@hotmail.com',
        // username: req.body.username,
        password: hashedPassword,
      })

      console.log('new user: ', newUser);

      const token = generateJWT(newUser._id)

      return res.header('Authorization', `Bearer ${token}`).status(200).json({
        success: true,
        data: newUser,
        token: token
      })
    } catch (err) {
      return res.status(500).json({success: false, error: err})
    }
  },

  // @desc logs user in with username & password
  // @route POST /api/user/login
  // @private
  login: async (req, res) => {
    try {
      // const user = await User.findOne({username: req.body.username})
      const user = await User.findOne({username: req.body.email})

      if (user) {
        const validPassword = await bcrypt.compare(req.body.password, user.password)

        if (validPassword) {
          const token = generateJWT(user._id)

          return res.header('Authorization', `Bearer ${token}`).status(200).json({
            success: true,
            token: token,
          })
        } else {
          return res.status(404).json({success: false, data: 'Incorrect credentials'})
        }
      } else {
        return res.status(404).json({success: false, data: 'Incorrect credentials'})
      }
    } catch (err) {
      console.log('err: ', err);
      return res.status(500).json({success: false, error: err})
    }
  },

  // @desc deletes user
  // @route DELETE /api/user/:id
  // @private
  deleteUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id)

      if (!user) {
        return res.status(404).json({success: false, error: 'No user found'})
      }

      await user.remove()

      return res.status(200).json({success: true, data: 'Account deleted'})
    } catch (err) {
      return res.status(500).json({success: false, error: err})
    }
  },

  // @desc updates user information
  // @route PATCH /api/user/:id
  // @private
  updateUser: async (req, res) => {
    console.log('updating..');
    try {
      // returns null if user is not found
      const user = await User.findById(req.params.id)

      // if its a password, need to hash it like in creating a user

      if (user) {
        const query = {id: user._id}
        const newValue = {$set: {email: req.body.email, password: req.body.password}};
        const updatedValue = await User.updateOne(query, newValue)
        return res.status(200).json(updatedValue)
      } else {
        return res.status(404).json({success: false, error: 'No user found'})
      }
    } catch (err) {
      console.warn(err);
      return res.status(500).json({success: false, error: err})
    }
  }
}

module.exports = UserController