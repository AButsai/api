import { UserEntity } from '@entities/users/users.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SkillsDto } from './dto/skills.dto';
import { SkillsEntity } from './skills.entity';

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(SkillsEntity)
    private readonly skillsRepository: Repository<SkillsEntity>,
  ) {}

  public async createSkills(id: number, body: SkillsDto) {
    const user = await this.getUser(id);
    const newSkills = this.skillsRepository.create({
      ...body,
      user,
    });
    await this.skillsRepository.save(newSkills);
    delete newSkills.user;
    return newSkills;
  }

  public async updateSkills(skillId: number, body: SkillsDto) {
    const skills = await this.skillsRepository.findOne({
      where: { id: skillId },
    });
    if (!skills) {
      throw new NotFoundException();
    }

    Object.assign(skills, body);
    await this.skillsRepository.save(skills);
    return skills;
  }

  // Get user
  private async getUser(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('Not found');
    }
    return user;
  }
}
