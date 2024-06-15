const express = require('express');
const AuthValidation = require('../../validations/AuthValidation');
const authController = require('../../controllers/auth.controller');
const authRouter = express.Router()



authRouter.post('/register',AuthValidation.userRegistration , authController.register)
authRouter.post('/setup-passowrd',AuthValidation.passwordSetup , authController.passwordSetup);
authRouter.post('/login',AuthValidation.login , authController.login);



module.exports = authRouter