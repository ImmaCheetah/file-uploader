
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://kxehdymjlydikmxcdbmd.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

const bucketExists = async (bucketName) => {
  const { data, error } = await supabase
    .storage
    .getBucket(bucketName)
  
  if (data) {
    console.log('BUCKET EXISTS')
    return true;
  } else {
    console.log('BUCKET DOES NOT EXIST')
    return false;
  }
}

const createBucket = async (bucketName) => {
  const { data, error } = await supabase.storage
  .createBucket(bucketName, {
    public: false,
    fileSizeLimit: 5000000
  })

  if (error) {
    console.log('Failed to create bucket', error)
  } else {
    console.log('Created bucket', data)
  }
}

const uploadFileToSupabase = async (bucketName, filePath, fileData, fileType) => {
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(filePath, fileData, {
        cacheControl: '3600',
        contentType: fileType,
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
  const { data, error } = supabase
    .storage
    .from(bucketName)
    .getPublicUrl(filePath)

  if (error) {
    console.log('Failed to get url', error);
  } else {
    return data.publicUrl;
  }
}

const downloadFile = async (bucketName, fileName) => {
  // const { data, error } = await supabase
  // .storage
  // .from(bucketName)
  // .download(`folder/files/${fileName}`)

  const { data, error } = await supabase
  .storage
  .from(bucketName)
  .createSignedUrl(`folder/files/${fileName}`, 2, {
    download: true,
  })


  if (error) {
    console.log('Failed to download', error)
  } else {
    console.log('Downloaded successfully', data)
    return data.signedUrl;
  }
}

module.exports = {
  supabase,
  bucketExists,
  createBucket,
  uploadFileToSupabase,
  getFileUrl,
  downloadFile
};
