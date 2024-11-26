const { Router } = require("express");
const indexRouter = Router();
const indexController = require('../controllers/indexController');
const passport = require('passport');
const multer  = require('multer')
const upload = multer({ dest: 'files/' })

indexRouter.get('/', indexController.getIndexPage);

indexRouter.post('/', upload.single('file'), indexController.uploadFile);

module.exports = indexRouter;