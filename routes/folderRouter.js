const { Router } = require("express");
const folderRouter = Router();
const folderController = require('../controllers/folderController');
const passport = require('passport');
const multer  = require('multer')
const upload = multer({ dest: 'files/' })

folderRouter.get('/:id', folderController.getFolderPage);

folderRouter.post('/new', folderController.createFolder);
folderRouter.post('/delete/:id', folderController.deleteFolder);

module.exports = folderRouter;