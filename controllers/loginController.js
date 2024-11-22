const db = require('../db/queries')

async function getLoginPage(req, res, next) {
  res.render('login');
}

module.exports = {
  getLoginPage,
}