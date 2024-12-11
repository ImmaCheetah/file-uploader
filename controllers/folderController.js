const db = require("../db/queries");
const fs = require("fs");

async function getFolderPage(req, res, next) {
  try {
    const folder = await db.getFolder(req.user.id, req.params.id);
    const files = await db.getAllFilesInFolder(req.user.id, req.params.id);

    res.render("folder", { folder: folder, files: files });
  } catch (error) {
    next(new Error("Failed to load folder"));
  }
}

async function createFolder(req, res, next) {
  try {
    const { folderName } = req.body;

    await db.addFolder(folderName, req.user.id);

    res.redirect("/");
  } catch (error) {
    next(new Error("Failed to create folder"));
  }
}

async function updateFolder(req, res, next) {
  try {
    const { folderName } = req.body;

    await db.updateFolder(req.params.id, folderName);

    res.redirect(`/folder/${req.params.id}`);
  } catch (error) {
    next(new Error("Failed to update folder name"));
  }
}

async function deleteFolder(req, res, next) {
  try {
    const filesToDelete = await db.getAllFilesInFolder(
      req.user.id,
      req.body.folderId,
    );
    // filesToDelete.forEach((file) => {
    //   fs.unlink(file.url, function (err) {
    //     if (err) throw err;
    //     console.log('File deleted!');
    //   });
    // })
    await db.deleteFolder(req.body.folderId);

    res.redirect("/");
  } catch (error) {
    next(new Error("Failed to delete folder"));
  }
}

module.exports = {
  getFolderPage,
  createFolder,
  updateFolder,
  deleteFolder,
};
