const db = require('../db/queries');
const supabase = require('../db/supabase');

async function uploadFile(req, res, next) {
  try {
    const {originalname, path, size} = req.file;
    const file = await db.uploadFile(originalname, path, size, req.params.folderId, req.user.id);
    console.log('REQ FILE', req.file);
    const uploadFileSupabase = async (bucketName, filePath, fileData) => {
      try {
        const { data, error } = await supabase.storage
          .from(bucketName)
          .upload(filePath, fileData, {
            cacheControl: '3600',
            upsert: false
          });
          console.log(`File uploaded to ${filePath}`);
          console.log(error)
          console.log(data)
      } catch (error) {
        throw error;
      }
    };
    

    const filePath = `/folder/files/${file.id + originalname}`;
    const fileData = file; // Assign your file data to this variable
    
    uploadFileSupabase('test', filePath, req.file);


    res.redirect(`/folder/${req.params.folderId}`);
    console.log('This is the file', file);
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