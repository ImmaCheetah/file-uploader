const db = require('../db/queries')

async function getIndexPage(req, res, next) {
  res.send('hello');
  // console.log(req.session);
}


module.exports = {
  getIndexPage,
}