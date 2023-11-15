import { CloudinaryService } from '@entities/cloudinary/cloudinary.service';
import { UserEntity } from '@entities/users/users.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EUploadPath } from '@src/enums/upload.enum';
import { Repository } from 'typeorm';
import { EducationDto } from './dto/education.dto';
import { EducationEntity } from './education.entity';

@Injectable()
export class EducationService {
  constructor(
    @InjectRepository(EducationEntity)
    private readonly educationRepository: Repository<EducationEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  // Create education experience
  public async createEducation(
    userId: number,
    body: EducationDto,
    file?: Express.Multer.File,
  ) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException();
    }
    const { imageUrl, publicImageId } = await this.uploadImage(file);
    const newEducation = this.educationRepository.create({
      ...body,
      imageUrl,
      publicImageId,
      user,
    });
    await this.educationRepository.save(newEducation);
    delete newEducation.user;
    return newEducation;
  }

  // Update education experience
  public async updateEducation(
    id: number,
    body: EducationDto,
    file?: Express.Multer.File,
  ) {
    const education = await this.educationRepository.findOne({ where: { id } });
    if (!education) {
      throw new NotFoundException();
    }
    if (file && education.publicImageId) {
      await this.cloudinaryService.deleteImgById(education.publicImageId);
    }
    const { imageUrl, publicImageId } = await this.uploadImage(file);

    Object.assign(education, {
      ...body,
      imageUrl: imageUrl ? imageUrl : education.imageUrl,
      publicImageId: publicImageId ? publicImageId : education.publicImageId,
    });
    await this.educationRepository.save(education);
    return education;
  }

  // Delete education experience
  public async deleteEducation(userId: number, id: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (user.avatarPublicId) {
      await this.cloudinaryService.deleteImgById(user.avatarPublicId);
    }
    await this.educationRepository.delete(id);
    return { message: 'Education deleted' };
  }

  private async uploadImage(file: Express.Multer.File) {
    if (!file) {
      return { imageUrl: null, publicImageId: null };
    }
    const uploadResponse = await this.cloudinaryService.uploadFile(
      EUploadPath.EDUCATION,
      file,
    );

    return {
      imageUrl: uploadResponse.url,
      publicImageId: uploadResponse.public_id,
    };
  }
}
