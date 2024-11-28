const { Router } = require("express");
const folderRouter = Router();
const folderController = require('../controllers/folderController');

folderRouter.get('/:id', folderController.getFolderPage);

folderRouter.post('/new', folderController.createFolder);
folderRouter.post('/update/:id', folderController.updateFolder);
folderRouter.post('/delete/:id', folderController.deleteFolder);

module.exports = folderRouter;