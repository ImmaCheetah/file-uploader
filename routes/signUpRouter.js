const { Router } = require("express");
const signUpRouter = Router();
const signUpController = require('../controllers/signUpController');

signUpRouter.get('/', signUpController.getSignUpPage);

signUpRouter.post('/', signUpController.createUser)

module.exports = signUpRouter;