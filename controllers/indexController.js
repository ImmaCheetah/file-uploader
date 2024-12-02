const db = require('../db/queries');

async function getIndexPage(req, res, next) {
  if (!req.user) {
    res.redirect('/login')
  } else {
    const folders = await db.getAllFolders(req.user.id);
    res.render('index', {folders: folders});
  }
  // console.log(req.session);
}

function getLogout(req, res, next) {
  req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
}

module.exports = {
  getIndexPage,
  getLogout
}