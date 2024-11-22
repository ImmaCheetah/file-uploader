const { Router } = require("express");
const loginRouter = Router();
const loginController = require('../controllers/loginController');

loginRouter.get('/', loginController.getLoginPage);


module.exports = loginRouter;