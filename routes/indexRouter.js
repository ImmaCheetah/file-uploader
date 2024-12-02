const { Router } = require("express");
const indexRouter = Router();
const indexController = require('../controllers/indexController');
const passport = require('passport');
const multer  = require('multer');
const { isAuth } = require("../middlewares/authMiddleware");
const upload = multer({ dest: 'files/' })


indexRouter.get('/', indexController.getIndexPage);
indexRouter.get('/logout', indexController.getLogout)

// indexRouter.post('/:folderId', upload.single('file'), indexController.uploadFile);

module.exports = indexRouter;