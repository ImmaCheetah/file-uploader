const db = require('../db/queries');

async function getIndexPage(req, res, next) {
  if (!req.user) {
    res.redirect('/login')
  } else {
    res.render('index');
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