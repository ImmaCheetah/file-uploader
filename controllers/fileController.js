const db = require('../db/queries');
const supabase = require('../db/supabase');

async function uploadFile(req, res, next) {
  try {
    const {originalname, path, size} = req.file;
    console.log('REQ FILE', req.file);
    // const file = await db.uploadFile(originalname, path, size, req.params.folderId, req.user.id);
    const filePath = `/folder/files/${originalname}`;
    const fileData = req.file.buffer; // Assign your file data to this variable
    
    supabase.uploadFileToSupabase('test', filePath, fileData);
    supabase.getFileUrl('test', '4_1730666225096-dog.jpg');


    res.redirect(`/folder/${req.params.folderId}`);
    // console.log('This is the file', file);
  } catch (error) {
    console.log(error);
  }
}

async function downloadFile(req, res, next) {
 
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