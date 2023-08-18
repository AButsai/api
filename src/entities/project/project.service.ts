import { UserEntity } from '@entities/users/users.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectDto } from './dto/project.dto';
import { ProjectEntity } from './project.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly projectRepository: Repository<ProjectEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  // Create project experience
  public async createProject(userId: string, body: ProjectDto) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException();
    }
    const newProject = this.projectRepository.create({
      ...body,
      user,
    });
    await this.projectRepository.save(newProject);
    delete newProject.user;
    return newProject;
  }

  // Update project experience
  public async updateProject(id: string, body: ProjectDto) {
    const project = await this.projectRepository.findOne({ where: { id } });
    if (!project) {
      throw new NotFoundException();
    }
    Object.assign(project, body);
    await this.projectRepository.save(project);
    return project;
  }

  // Delete project experience
  public async deleteProject(id: string) {
    await this.projectRepository.delete(id);
    return { message: 'Project experience deleted' };
  }
}
