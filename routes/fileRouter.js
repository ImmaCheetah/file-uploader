const { Router } = require("express");
const fileRouter = Router();
const fileController = require('../controllers/fileController');
const passport = require('passport');
const multer  = require('multer')
const upload = multer({ dest: 'files/' })

// fileRouter.get('/', fileController.getIndexPage);

fileRouter.post('/:folderId', upload.single('file'), fileController.uploadFile);
// fileRouter.post('/:folderId', upload.single('file'), fileController.uploadFile);


module.exports = fileRouter;