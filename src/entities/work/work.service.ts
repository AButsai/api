import { UserEntity } from '@entities/users/users.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkDto } from './dto/work.dto';
import { WorkEntity } from './work.entity';

@Injectable()
export class WorkService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(WorkEntity)
    private readonly workRepository: Repository<WorkEntity>,
  ) {}

  // Create work experience
  public async createWork(id: string, body: WorkDto) {
    const user = await this.getUser(id);
    const newWork = this.workRepository.create({
      ...body,
      user,
    });
    await this.workRepository.save(newWork);
    return newWork;
  }

  // Update work experience
  public async updateWork(workId: string, body: WorkDto) {
    const work = await this.workRepository.findOne({ where: { id: workId } });
    if (!work) {
      throw new NotFoundException();
    }

    Object.assign(work, body);
    await this.workRepository.save(work);
    return work;
  }

  // Delete work experience
  public async deleteWork(workId: string) {
    await this.workRepository.delete(workId);
    return { message: 'Work experience deleted' };
  }

  // Get user
  private async getUser(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('Not found');
    }
    return user;
  }
}
