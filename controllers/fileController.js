const db = require("../db/queries");
const supabase = require("../db/supabase");
const { v4: uuidv4 } = require("uuid");
const toArrayBuffer = require("../helper/toArrayBuffer");

const { body, validationResult } = require("express-validator");

const validateFile = [
  body("file")
    .custom((value, { req }) => {
      if (!req.file) throw new Error("File is empty");
      return true;
    })
    .withMessage(`Please select a file before uploading`)
    .custom((value, { req }) => {
      if (req.file.size > 5000000) throw new Error("File is too big");
      return true;
    })
    .withMessage(`File is too big`),
];

async function uploadFile(req, res, next) {
  try {
    const errors = validationResult(req);

    // if (!errors.isEmpty()) {
    //   return res
    //   .status(400)
    //   .render(`/folder/${req.params.folderId}`, {
    //       param: req.params,
    //       title: 'Folder',
    //       errors: errors.array()
    //   })
    // }

    // Can't figure out how to pass in error data to show it
    if (!errors.isEmpty()) {
      res.redirect(`/folder/${req.params.folderId}`);
      return;
    }

    const userBucket = req.user.id;
    const fileName = `${req.file.originalname}-${uuidv4()}`;
    const fileType = req.file.mimetype;
    const filePath = `folder/files/${fileName}`;
    const fileData = req.file.buffer;
    const buffer = toArrayBuffer(fileData);
    const bucketExists = await supabase.bucketExists(userBucket);

    if (!bucketExists) {
      supabase.createBucket(userBucket);
    }

    supabase.uploadFileToSupabase(userBucket, filePath, buffer, fileType);

    await db.uploadFile(
      req.file.originalname,
      fileName,
      req.file.size,
      req.params.folderId,
      req.user.id,
    );

    res.redirect(`/folder/${req.params.folderId}`);
  } catch (error) {
    next(new Error("Could not upload file"));
  }
}

async function downloadFile(req, res, next) {
  try {
    const userBucket = req.user.id;
    const fullFileName = req.params.fileId;
    const downloadLink = await supabase.downloadFile(userBucket, fullFileName);

    res.redirect(downloadLink);
  } catch (error) {
    next(new Error("Failed to download file"));
  }
}

async function deleteFile(req, res, next) {
  try {
    const userBucket = req.user.id;
    const fullFileName = req.params.fileId;

    await db.deleteFile(fullFileName);
    await supabase.deleteFile(userBucket, fullFileName);

    res.redirect("back");
  } catch (error) {
    next(new Error("Failed to delete file"));
  }
}

module.exports = {
  uploadFile,
  downloadFile,
  deleteFile,
  validateFile,
};
