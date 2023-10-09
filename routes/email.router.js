const express = require('express')
const emailController = require('./email.controller')
const emailRouter = express.Router()


emailRouter.post( '/' , emailModel.addNewEmail)

module.exports()