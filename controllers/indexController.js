const db = require('../db/queries')

async function getIndexPage(req, res, next) {
  if (!req.session.user) {
    res.redirect('/login')
  } else {
    res.send('hello');
  }
  // console.log(req.session);
}


module.exports = {
  getIndexPage,
}