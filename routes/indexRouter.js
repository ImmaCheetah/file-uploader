const { Router } = require("express");
const indexRouter = Router();
const indexController = require("../controllers/indexController");

indexRouter.get("/", indexController.getIndexPage);
indexRouter.get("/logout", indexController.getLogout);

module.exports = indexRouter;
