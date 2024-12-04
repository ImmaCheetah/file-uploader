
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://kxehdymjlydikmxcdbmd.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

const uploadFileToSupabase = async (bucketName, filePath, fileData) => {
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(filePath, fileData, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.log('Failed to upload', error)
    } else {
      console.log('Upload was successful')
      console.log(`File uploaded to ${filePath}`);
      console.log(data)
    }
};

const getFileUrl = async (bucketName, filePath) => {
  const { data } = supabase
    .storage
    .from(bucketName)
    .getPublicUrl(filePath)
  console.log('SUPABASE FILE URL', data);
}

const downloadFile = async (bucketName, fileName) => {
  const { data, error } = await supabase
  .storage
  .from(bucketName)
  .download(`folder/files/${fileName}`)

  if (error) {
    console.log('Failed to download, error')
  } else {
    console.log('Downloaded successfully', data)
  }

}

module.exports = {
  supabase,
  uploadFileToSupabase,
  getFileUrl,
  downloadFile
};
