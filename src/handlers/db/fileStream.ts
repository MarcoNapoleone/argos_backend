import {Storage} from "@google-cloud/storage";
import {Folder} from "../../types/Folder";
import {Express} from "express";
import {format} from "util";


const storage = new Storage({
  projectId: process.env.GCLOUD_PROJECT_ID,
  credentials: {
    client_email: process.env.GCLOUD_CLIENT_EMAIL,
    private_key: process.env.GCLOUD_PRIVATE_KEY.replace(/\\n/g, '\n')
  }
});
const bucket = storage.bucket(process.env.GCLOUD_BUCKET_NAME);

// get temporary link for file download from google cloud storage bucket (expires in 5 minutes)
export async function getTemporaryLink(path: string, expires: number = 300000) {
  const blob = bucket.file(path);
  const data = await blob.getSignedUrl({
    action: 'read',
    expires: new Date(Date.now() + expires)
  });
  return data[0];
}

export async function upload(folder: Folder, name: string, file: Express.Multer.File): Promise<{ path: string }> {
  return new Promise((resolve, reject) => {

    const blob = bucket.file(`${folder}/${name.replace(/ /g, "_")}`)
    const blobStream = blob.createWriteStream({
      resumable: false
    })
    blobStream.on('finish', () => {
        const path = format(
          `${blob.name}`
        )
        resolve({path})
      })
      .on('error', () => {
        reject(`Unable to upload image, something went wrong`)
      })
      .end(file.buffer)
  })
}

export async function deleteFile(path: string): Promise<void> {
  try {
    const blob = bucket.file(path);
    await blob.delete();
  } catch (error) {
    console.log(error);
  }
}
