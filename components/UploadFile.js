import AWS from "aws-sdk"
import fs from 'react-native-fs'
import * as mime from 'react-native-mime-types';
import { Buffer } from "buffer";


const env = require("../env.json");

export const UploadFile = async (uri, user) => {
  // return new Promise(async (resolve, reject) => {
  if (uri == undefined || uri == null || uri.length == 0) {
    console.error("No image selected");
    return;
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

  const params = {
    Bucket: 'image-blobs/posts',
    Key: `${user.id}/${fileName}`,
    Body: arrayBuffer,
    ContentDisposition: contentDisposition,
    ContentType: contentType
  }

  const uploadResult = await s3Bucket.upload(params).promise().catch(err => { console.log(err); return; });
  console.log("succesfully uploaded", JSON.stringify(uploadResult));

  const getParams = {
    Bucket: 'image-blobs/posts',
    Key: `${user.id}/${fileName}`,
  }

  const donwloadResult = await s3Bucket.getObject(getParams).promise().catch(err => { console.log(err); return; });
  console.log("succesful download!");

  // const 
  return;

  s3Bucket.upload(params, (err, data) => {
    if (err) {
      reject(err);
    } else {
      console.log("Success uploading! Now trying to download...data: " + JSON.stringify(data));
      resolve(data);

      // s3Bucket.getObject((err, data) => {
      //   if (err) {
      //     reject(err);
      //   } else {
      //     console.log("Sucessfully downoaded data: " + JSON.stringify(data.body));  // might be bytes 
      //     resolve(data.body);
      //   }
      // })
    }
  });
  // });
}