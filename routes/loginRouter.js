const { Router } = require("express");
const loginRouter = Router();
const loginController = require('../controllers/loginController');
const passport = require("passport");

loginRouter.get('/', loginController.getLoginPage);

loginRouter.post('/', passport.authenticate('local', {
  failureRedirect: "/login",
  failureMessage: true,
  successRedirect: "/"
}));

module.exports = loginRouter;