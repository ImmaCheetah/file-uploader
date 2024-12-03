
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://kxehdymjlydikmxcdbmd.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

const uploadFileToSupabase = async (bucketName, filePath, fileData) => {
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

const getFileUrl = async (bucketName, filePath) => {
  const { data } = supabase
    .storage
    .from(bucketName)
    .getPublicUrl(filePath)
  console.log('SUPABASE FILE URL', data);
}

module.exports = {
  supabase,
  uploadFileToSupabase,
  getFileUrl
};
