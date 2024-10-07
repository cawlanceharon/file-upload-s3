
const s3 = require('../config/awsConfig');

// Upload file to S3
const uploadFileToS3 = async (file) => {
    const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: `${Date.now()}-${file.originalname}`,
        Body: file.buffer,
        ContentType: file.mimetype,
    };

    try {
        const data = await s3.upload(params).promise();
        return data.Location; // Return the S3 file URL
    } catch (error) {
        throw new Error(`S3 upload failed: ${error.message}`);
    }
};

// Fetch file from S3
const fetchFileFromS3 = async (fileKey) => {
    const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: fileKey,
    };

    try {
        const data = await s3.getObject(params).promise();
        return { fileContent: data.Body, contentType: data.ContentType };
    } catch (error) {
        throw new Error(`S3 fetch failed: ${error.message}`);
    }
};

module.exports = {
    uploadFileToS3,
    fetchFileFromS3,
};
        