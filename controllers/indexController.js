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

module.exports = {
  getIndexPage,
}