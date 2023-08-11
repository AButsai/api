import { getStorage, ref, uploadBytes } from '@firebase/storage';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FirebaseService {
  public async upload(
    file: Express.Multer.File,
    path: string,
    fileName: string,
  ) {
    const storage = getStorage();

    const fileExtension = file.originalname.split('.').pop();
    const fileRef = ref(storage, `${path}/${fileName}.${fileExtension}`);

    const upload = await uploadBytes(fileRef, file.buffer);

    return upload.metadata.fullPath;
  }
}
