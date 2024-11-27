const db = require('../db/queries');

async function createFolder(req, res, next) {
  try {
    const {folderName} = req.body;

    console.log('ASDJKLHASDHJKGHASHJ')
    const folder = await db.addFolder(folderName, req.user.id);
    console.log('AAAAAAA',folder)
    res.redirect('/');
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  createFolder
}