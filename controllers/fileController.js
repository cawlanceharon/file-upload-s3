
const { uploadFileToS3, fetchFileFromS3 } = require('../services/fileService');

// Handle file upload
const uploadFile = async (req, res, next) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    try {
        const fileUrl = await uploadFileToS3(req.file);
        res.status(201).json({ message: 'File uploaded successfully', fileUrl });
    } catch (error) {
        next(error); // Pass error to the error middleware
    }
};

// Handle file fetch from S3
const fetchFile = async (req, res, next) => {
    const fileKey = req.params.key;

    try {
        const { fileContent, contentType } = await fetchFileFromS3(fileKey);
        const fileUrl = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`;

        res.status(200).json({
            message: 'File fetched successfully',
            fileUrl: fileUrl,
            contentType: contentType,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    uploadFile,
    fetchFile,
};
        