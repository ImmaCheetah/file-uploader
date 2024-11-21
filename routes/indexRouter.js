const { Router } = require("express");
const indexRouter = Router();
const indexController = require('../controllers/indexController');
const passport = require('passport');

indexRouter.get('/', indexController.getIndexPage);

module.exports = indexRouter;