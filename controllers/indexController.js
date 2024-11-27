const db = require('../db/queries');

async function getIndexPage(req, res, next) {
  if (!req.user) {
    res.redirect('/login')
  } else {
    const folders = await db.getAllFolders();
    res.render('index', {folders: folders});
  }
  // console.log(req.session);
}

async function uploadFile(req, res, next) {
  res.send('done did it');
  console.log('This is the file', req.file);
}


module.exports = {
  getIndexPage,
  uploadFile
}