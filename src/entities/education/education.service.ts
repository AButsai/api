import { UserEntity } from '@entities/users/users.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
  ) {}

  // Create education experience
  public async createEducation(userId: string, body: EducationDto) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException();
    }
    const newEducation = this.educationRepository.create({
      ...body,
      user,
    });
    await this.educationRepository.save(newEducation);
    return newEducation;
  }

  // Update education experience
  public async updateEducation(id: string, body: EducationDto) {
    const education = await this.educationRepository.findOne({ where: { id } });
    if (!education) {
      throw new NotFoundException();
    }
    Object.assign(education, body);
    await this.educationRepository.save(education);
    return education;
  }

  // Delete education experience
  public async deleteEducation(id: string) {
    await this.educationRepository.delete(id);
    return { message: 'Education deleted' };
  }
}
