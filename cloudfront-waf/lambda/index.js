const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const s3 = new AWS.S3();

const BUCKET_NAME = process.env.BUCKET_NAME;

exports.handler = async () => {
  const uuid = uuidv4();

  const now = new Date();
  const timestamp = now.toISOString().replace(/[:.]/g, '-'); // e.g. "2025-03-23T08-00-00Z"
  const fileName = `${timestamp}.txt`;
  const fileContent = `Generated UUID: ${uuid}`;

  const params = {
    Bucket: BUCKET_NAME,
    Key: fileName,
    Body: fileContent,
    ContentType: "text/plain"
  };

  try {
    await s3.putObject(params).promise();
    console.log(`Successfully stored file: ${fileName}`);
    return {
      statusCode: 200,
      body: JSON.stringify(`Stored UUID in file: ${fileName}`),
    };
  } catch (error) {
    console.error("Error writing to S3:", error);
    return {
      statusCode: 500,
      body: JSON.stringify("Failed to write UUID to S3."),
    };
  }
};
