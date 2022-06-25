const mongoose = require('mongoose')
const {Schema} = mongoose

const UserSchema = {
  email: {
    type: String,
    trim: true,
    unique: true,
    // required: [true, 'Please enter a phone number'],
  },
  buyingPower: {
    type: Number,
    default: 1000000
  },
  // username: {
  //   type: String,
  //   trim: true,
  //   unique: true,
  //   required: [true, 'Please enter a username'],
  // },
  password: {
    type: String,
    trim: true,
    required: [true, 'Please enter a password'],
  },
  watchlist: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Watchlist',
    },
  ],
  simulation: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Simulation',
    },
  ],
}

// UserSchema.post('save', handleValidationError)
// UserSchema.post('update', handleValidationError)

const User = mongoose.model('User', UserSchema)
module.exports = User

// possibly dont need this
// just an additional check for empty / duplicate values
// const handleValidationError = (error, res, next) => {
//   if (error.name === 'ValidationError') {
//     // returns an array of validation messages
//     throw Object.values(error.errors).map((val) => val.message)
//   } else if (error.code === 11000) {
//     throw duplicationMsg(error.keyValue)
//   } else {
//     next()
//   }
// }

// type user = {
//   phoneNumber?: String,
//   username?: String,
// }

// const duplicationMsg = (keyValue) => {
//   return keyValue.phoneNumber
//     ? 'That phone number is already registered - database'
//     : 'That username is already registered - database'
// }

// export default User

// if you can follow usernames, would need to put that into schema
// how will i handle, if user deletes account ?
// this will be a bonus feature
// followedUsernames: [
//   {
//     type: String,
//   },
// ];
