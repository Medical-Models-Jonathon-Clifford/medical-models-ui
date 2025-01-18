// upload-to-s3.js
const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const mime = require('mime');

// Configure AWS SDK
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION, // e.g. 'us-west-2'
});

// Configurations
const buildDirectory = path.join(__dirname, './out');
const bucketName = 'first-react-static-website-12412409441241'; // Change this to your bucket name

// Helper function to upload file to S3
const uploadFile = (filePath) => {
  const fileContent = fs.readFileSync(filePath);
  const contentType = mime.getType(filePath);

  const params = {
    Bucket: bucketName,
    Key: path.relative(buildDirectory, filePath), // this makes sure files are uploaded under the build folder structure
    Body: fileContent,
    ContentType: contentType || 'application/octet-stream', // Fallback to 'application/octet-stream' if no content type found
  };

  return new Promise((resolve, reject) => {
    s3.upload(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

// Recursive function to get all files in directory
const getAllFiles = (dir, fileList = []) => {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllFiles(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  });
  return fileList;
};

// Main function
const main = async () => {
  try {
    const files = getAllFiles(buildDirectory);
    const uploadPromises = files.map((file) => uploadFile(file));
    const results = await Promise.all(uploadPromises);
    console.log('All files uploaded successfully:', results);
  } catch (error) {
    console.error('Error uploading files:', error);
  }
};

main();
