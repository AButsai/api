import { EducationEntity } from '@entities/education/education.entity';
import { ProjectEntity } from '@entities/project/project.entity';
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
    @InjectRepository(ProjectEntity)
    private readonly projectRepository: Repository<ProjectEntity>,
    @InjectRepository(EducationEntity)
    private readonly educationRepository: Repository<EducationEntity>,
  ) {}

  // Upload
  public async uploadImage(
    id: number,
    file: Express.Multer.File,
    folder: string,
  ) {
    if (folder === EUploadPath.AVATARS) {
      return await this.uploadAvatar(id, file, folder);
    }
    if (folder === EUploadPath.PROJECT) {
      return await this.uploadProjectImg(id, file, folder);
    }
    if (folder === EUploadPath.EDUCATION) {
      return await this.uploadEducationImg(id, file, folder);
    }
    throw new BadRequestException('Invalid folder name');
  }

  // Update Avatar
  public async updateAvatar(id: number, file: Express.Multer.File) {
    // const user = await this.userRepository.findOne({ where: { id } });
    // if (!user) {
    //   throw new NotFoundException('User not found');
    // }
    // const avatarId = user.avatarPublicId;
    // try {
    //   const response = await cloudinary.uploader.destroy(avatarId, {
    //     invalidate: true,
    //   });
    //   if (response.result === 'ok') {
    //     await this.uploadImage(user.id, file, 'avatars');
    //   }
    //   return { message: 'Avatar updated' };
    // } catch (error) {
    //   throw new Error(error.message);
    // }
  }

  // Upload avatar
  private async uploadAvatar(
    id: number,
    file: Express.Multer.File,
    folder: string,
  ) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const responseCloudinary = await this.uploadFile(folder, file);
    user.avatarURL = responseCloudinary.url;
    user.avatarPublicId = responseCloudinary.public_id;
    await this.userRepository.save(user);

    return { message: 'Images uploaded' };
  }

  // Upload projects images
  private async uploadProjectImg(
    id: number,
    file: Express.Multer.File,
    folder: string,
  ) {
    const responseCloudinary = await this.uploadFile(folder, file);
    return responseCloudinary;
  }

  // Upload education images
  private async uploadEducationImg(
    id: number,
    file: Express.Multer.File,
    folder: string,
  ) {
    const responseCloudinary = await this.uploadFile(folder, file);
    return responseCloudinary;
  }

  // Upload file to cloudinary
  private async uploadFile(folder: string, file: Express.Multer.File) {
    return await new Promise<CloudinaryResponse>((res, rej) => {
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
  }
}
