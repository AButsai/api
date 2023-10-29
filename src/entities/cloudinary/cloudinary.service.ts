import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import * as streamifier from 'streamifier';
import { CloudinaryResponse } from './types/cloudinary-response';

@Injectable()
export class CloudinaryService {
  public async uploadImage(files: Express.Multer.File[]) {

    //Upload files
    const uploadedFiles = await Promise.all(
      files.map((file) => {
        return new Promise<CloudinaryResponse>((res, rej) => {
          if (!file || !file.buffer) {
            rej(new Error('Invalid file data'));
            return;
          }
          const uploadStream = cloudinary.uploader.upload_stream(
            (err, result) => {
              if (err) return rej(err);
              res(result);
            },
          );
          streamifier.createReadStream(file.buffer).pipe(uploadStream);
        });
      }),
    );
    return uploadedFiles;
  }

  // Delete files
  public async deleteImage(publicIds: string[]) {
    if (!publicIds || publicIds.length === 0) {
      return;
    }

    try {
      await Promise.all(
        publicIds.map(publicId => cloudinary.uploader.destroy(publicId, {invalidate: true}))
      )
    } catch (error) {
      throw new Error(error.message)
    }
  }
}
