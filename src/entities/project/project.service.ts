import { CloudinaryService } from '@entities/cloudinary/cloudinary.service';
import { UserEntity } from '@entities/users/users.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EUploadPath } from '@src/enums/upload.enum';
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
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  // Create project experience
  public async createProject(
    userId: number,
    body: ProjectDto,
    file?: Express.Multer.File,
  ) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException();
    }

    const { imageUrl, publicImageId } = await this.uploadImage(file);

    const newProject = this.projectRepository.create({
      ...body,
      imageUrl,
      publicImageId,
      user,
    });
    await this.projectRepository.save(newProject);
    delete newProject.user;
    return newProject;
  }

  // Update project experience
  public async updateProject(
    id: number,
    body: ProjectDto,
    file?: Express.Multer.File,
  ) {
    const project = await this.projectRepository.findOne({ where: { id } });
    if (!project) {
      throw new NotFoundException();
    }
    if (file && project.publicImageId) {
      await this.cloudinaryService.deleteImgById(project.publicImageId);
    }
    const { imageUrl, publicImageId } = await this.uploadImage(file);
    Object.assign(project, {
      ...body,
      imageUrl: imageUrl ? imageUrl : project.imageUrl,
      publicImageId: publicImageId ? publicImageId : project.publicImageId,
    });
    await this.projectRepository.save(project);
    return project;
  }

  // Delete project experience
  public async deleteProject(userId: number, id: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (user.avatarPublicId) {
      await this.cloudinaryService.deleteImgById(user.avatarPublicId);
    }
    await this.projectRepository.delete(id);
    return { message: 'Project experience deleted' };
  }

  // Upload image
  private async uploadImage(file: Express.Multer.File) {
    if (!file) {
      return { imageUrl: null, publicImageId: null };
    }
    const uploadResponse = await this.cloudinaryService.uploadFile(
      EUploadPath.PROJECT,
      file,
    );

    return {
      imageUrl: uploadResponse.url,
      publicImageId: uploadResponse.public_id,
    };
  }
}
