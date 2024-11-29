const db = require('../db/queries');

async function uploadFile(req, res, next) {
  try {
    const {originalname, path} = req.file;
    const file = await db.uploadFile(originalname, path, req.params.folderId, req.user.id);

    res.redirect(`/folder/${req.params.folderId}`);
    console.log('This is the file', file);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  uploadFile,
}