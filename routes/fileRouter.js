const { Router } = require("express");
const fileRouter = Router();
const fileController = require('../controllers/fileController');
const passport = require('passport');
const multer  = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

// fileRouter.get('/', fileController.getIndexPage);
fileRouter.get('/download/:fileId', fileController.downloadFile);

fileRouter.post('/upload/:folderId', upload.single('file'), fileController.uploadFile);
fileRouter.post('/delete/:fileId', fileController.deleteFile);


module.exports = fileRouter;