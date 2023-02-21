import AWS from "aws-sdk"
import fs from 'react-native-fs'
import * as mime from 'react-native-mime-types';
import { Buffer } from "buffer";

const env = require("../env.json");

export const UploadFile = async (uri, user_id) => {
  /**
   * Upload an image to /posts/user_id
   * Throw an error if the upload fails
   */

  if (uri == undefined || uri == null || uri.length == 0) {
    console.error("No image selected");
    throw new Error("No image selected");
  }

  const s3Bucket = new AWS.S3({
    accessKeyId: env.awsAccessKey,
    secretAccessKey: env.awsSecretAccessKey,
    Bucket: 'image-blobs',
    signatureVersion: 'v4'
  });

  const base64 = await fs.readFile(uri, 'base64');
  const contentType = mime.lookup(uri);
  const fileName = Math.random().toString(36).slice(2);
  const contentDisposition = 'inline;filename=' + fileName + '"';
  const arrayBuffer = Buffer.from(base64, 'base64');
  const fileKey = `${user_id}/${fileName}`;

  const params = {
    Bucket: 'image-blobs/posts',
    Key: fileKey,
    Body: arrayBuffer,
    ContentDisposition: contentDisposition,
    ContentType: contentType
  }

  const uploadResult = await s3Bucket.upload(params).promise();
  console.log("succesfully uploaded at",uploadResult.Location);
  return fileKey;

}

export const DownloadFile = async (user_id, fileName) => {
  const getParams = {
    Bucket: 'image-blobs/posts',
    Key: `${user_id}/${fileName}`,
  }

  const donwloadResult = await s3Bucket.getObject(getParams).promise();
  console.log("succesful download!");
  return donwloadResult.Body; // bytes of base64 encoded data
}