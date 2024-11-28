const db = require('../db/queries');

async function uploadFile(req, res, next) {
  try {
    const {originalname, path} = req.file;

    console.log('EEEEEEEEEEEEEEEEEEEEEEEEY', req.params.folderId, req.user.id);
    await db.uploadFile(originalname, path, req.params.folderId, req.user.id)
    res.redirect('/');
    console.log('This is the file', req.file);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  uploadFile,
}