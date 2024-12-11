const db = require("../db/queries");

async function getLoginPage(req, res, next) {
  res.render("login", { failureMessage: req.session.messages, title: "Login" });
}

module.exports = {
  getLoginPage,
};
