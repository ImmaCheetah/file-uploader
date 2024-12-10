const db = require('../db/queries');
const supabase = require('../db/supabase');
const { v4: uuidv4 } = require('uuid');
const toArrayBuffer = require('../helper/toArrayBuffer');

const { body, validationResult } = require("express-validator");

const validateFile = [
  body('file').custom((value, { req }) => {
      if (!req.file)
        throw new Error("File is empty");
        return true;
    }).withMessage(`Please select a file before uploading`),
]

async function uploadFile(req, res, next) {
  try {
    const errors = validationResult(req);
    console.log('AAAAAAAAAAAAAAAAAA',errors)
    // if (!errors.isEmpty()) {
    //   return res
    //   .status(400)
    //   .render(`/folder/${req.params.folderId}`, {
    //       param: req.params,
    //       title: 'Folder', 
    //       errors: errors.array()
    //   })
    // }

    if (!errors.isEmpty()) {
      res.redirect(`/folder/${req.params.folderId}`)
    }
    
    const userBucket = req.user.id;
    const fileName = `${req.file.originalname}-${uuidv4()}`;
    const fileType = req.file.mimetype;
    const filePath = `folder/files/${fileName}`;
    const fileData = req.file.buffer; 
    const buffer = toArrayBuffer(fileData);
    const bucketExists = await supabase.bucketExists(userBucket);
    console.log('BUFFER', buffer);
    console.log('REQ FILE', req.file);


    if (!bucketExists) {
      supabase.createBucket(userBucket);
    } 
    
    supabase.uploadFileToSupabase(userBucket, filePath, buffer, fileType);

    await db.uploadFile(req.file.originalname, fileName, req.file.size, req.params.folderId, req.user.id);

    res.redirect(`/folder/${req.params.folderId}`);
  } catch (error) {
    console.log(error);
  }
}

async function downloadFile(req, res, next) {
  const userBucket = req.user.id;
  const fullFileName = req.params.fileId;
  const downloadLink = await supabase.downloadFile(userBucket, fullFileName);

  res.redirect(downloadLink);
}

async function deleteFile(req, res, next) {
  try {
    const userBucket = req.user.id;
    const fullFileName = req.params.fileId;

    await db.deleteFile(fullFileName);
    await supabase.deleteFile(userBucket, fullFileName);
  
    res.redirect('back');
  } catch (error) {
    console.log('Failed to delete file', error);
  }
}

module.exports = {
  uploadFile,
  downloadFile,
  deleteFile,
  validateFile
}