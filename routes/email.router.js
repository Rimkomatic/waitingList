const express = require('express')
const emailController = require('./email.controller')
const emailRouter = express.Router()

emailRouter.get( '/' , emailController.httpDefaultResponse)
emailRouter.get( '/list' , emailController.httpGetEmailList)
emailRouter.post( '/add' , emailController.httpAddNewEmail)
emailRouter.post('/list/clear' , emailController.httpDeleteAll)

module.exports = emailRouter