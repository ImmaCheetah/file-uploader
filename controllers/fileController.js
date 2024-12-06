const db = require('../db/queries');
const supabase = require('../db/supabase');
const { v4: uuidv4 } = require('uuid');
const toArrayBuffer = require('../helper/toArrayBuffer');

async function uploadFile(req, res, next) {
  try {
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
    // const fileUrl = await supabase.getFileUrl(userBucket, fileName);

    await db.uploadFile(req.file.originalname, fileName, req.file.size, req.params.folderId, req.user.id);

    // supabase.downloadFile('test', 'Screenshot from 2024-12-03 15-09-10.png')
    
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
  console.log(req.params)
  await db.deleteFile(req.params.fileId);

  // res.redirect(`/folder/${req.params.folderId}`);
}

module.exports = {
  uploadFile,
  downloadFile,
  deleteFile
}