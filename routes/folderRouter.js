const { Router } = require("express");
const folderRouter = Router();
const folderController = require('../controllers/folderController');
const passport = require('passport');
const multer  = require('multer')
const upload = multer({ dest: 'files/' })

folderRouter.get('/:id', folderController.getFolderPage);

folderRouter.post('/:id', folderController.deleteFolder);
folderRouter.post('/new', folderController.createFolder);

module.exports = folderRouter;