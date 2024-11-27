const db = require('../db/queries');

async function createFolder(req, res, next) {
  try {
    const {folderName} = req.body;

    await db.addFolder(folderName, req.user.id);

    res.redirect('/');
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  createFolder
}