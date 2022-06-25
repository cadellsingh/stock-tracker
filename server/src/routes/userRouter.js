const express = require('express')
const UserControls = require('../controllers/UserController')
const verify = require('../utils/verifyToken')
const userRouter = express.Router()

userRouter.get('/get', verify, UserControls.getUser) // ? do i need this 
// userRouter.get('/:id', UserControls.getUser) // ? do i need this 

userRouter.post('/register', UserControls.createUser)

userRouter.post('/login', UserControls.login)

// prob wouldnt need params here again
// if im using req.user.id

userRouter.delete('/:id', UserControls.deleteUser)
// userRouter.delete('/:id', verify, deleteUser)

userRouter.patch('/:id', UserControls.updateUser) // ? patch or put for this
// userRouter.put('/:id', verify, updateUser)

// userRouter.get("/:id/watchlist", getWatchlist) // *  put in own router folder

// userRouter.get("/:id/simulation", getSimulation) // *  put in own router folder


module.exports = userRouter

// * I WILL HAVE TO SET AUTH HEADERS ON THE FRONTEND AFTER I GET TOKEN

// for quick testing, i can just remove the verify 


// I can prob still pass the verify function
// and pass a param id to do the actions