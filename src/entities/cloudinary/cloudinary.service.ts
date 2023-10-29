import { UserEntity } from '@entities/users/users.entity';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v2 as cloudinary } from 'cloudinary';
import * as streamifier from 'streamifier';
import { Repository } from 'typeorm';
import { EUploadPath } from './enums/upload.enum';
import { CloudinaryResponse } from './types/cloudinary-response';

@Injectable()
export class CloudinaryService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  //Upload files
  public async uploadImage(
    id: number,
    file: Express.Multer.File,
    folder: string,
  ) {
    if (folder !== EUploadPath.AVATARS && folder !== EUploadPath.FILES) {
      throw new BadRequestException('Invalid folder name');
    }
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const response = await new Promise<CloudinaryResponse>((res, rej) => {
      if (!file || !file.buffer) {
        rej(new Error('Invalid file data'));
        return;
      }
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: folder },
        (err, result) => {
          if (err) return rej(err);
          res(result);
        },
      );
      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });

    user.avatarURL = response.url;
    user.avatarPublicId = response.public_id;
    await this.userRepository.save(user);

    return { message: 'Avatar uploaded' };
  }

  // Update Avatar
  public async updateAvatar(id: number, file: Express.Multer.File) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const avatarId = user.avatarPublicId;
    try {
      const response = await cloudinary.uploader.destroy(avatarId, {
        invalidate: true,
      });

      if (response.result === 'ok') {
        await this.uploadImage(user.id, file, 'avatars');
      }
      return { message: 'Avatar updated' };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
