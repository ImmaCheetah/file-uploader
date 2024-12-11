const db = require("../db/queries");

async function getIndexPage(req, res, next) {
  try {
    if (!req.user) {
      res.redirect("/login");
    } else {
      const folders = await db.getAllFolders(req.user.id);
      const files = await db.getAllFiles(req.user.id);

      res.render("index", { folders: folders, files: files });
    }
  } catch (error) {
    next(new Error("Could not get home page"));
  }
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
  getLogout,
};
