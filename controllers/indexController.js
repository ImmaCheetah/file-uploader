const db = require('../db/queries')

async function getIndexPage(req, res, next) {
  res.send('hello');
}


module.exports = {
  getIndexPage,
}