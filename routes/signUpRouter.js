const { Router } = require("express");
const signUpRouter = Router();
const signUpController = require('../controllers/signUpController');
const {validateUser} = require('../controllers/signUpController');

signUpRouter.get('/', signUpController.getSignUpPage);

signUpRouter.post('/', validateUser, signUpController.createUser);

module.exports = signUpRouter;