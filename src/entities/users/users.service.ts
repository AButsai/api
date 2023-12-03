import { CloudinaryService } from '@entities/cloudinary/cloudinary.service';
import { TokensService } from '@entities/tokens/tokens.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EUploadPath } from '@src/enums/upload.enum';
import { Repository } from 'typeorm';
import {
  UpdateConsentOfUseDto,
  UpdateSampleColorSchemaDto,
  UpdateUserDto,
} from './dto/users.dto';
import { UserEntity } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly tokensService: TokensService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  // Current user
  public async current(email: string) {
    const user = await this.getUser(email);
    const roles = user.roles.map((role) => role.role);
    const responseDataUser = { ...user, roles };
    const { accessToken, refreshToken } =
      await this.tokensService.generateTokens(user);
    return {
      user: responseDataUser,
      accessToken,
      refreshToken,
    };
  }

  // Update user
  public async update(
    id: number,
    body: UpdateUserDto | UpdateSampleColorSchemaDto | UpdateConsentOfUseDto,
    file?: Express.Multer.File,
  ) {
    let avatarURL: string;
    let avatarPublicId: string;
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (file !== undefined) {
      if (user.avatarPublicId) {
        await this.cloudinaryService.deleteImgById(user.avatarPublicId);
      }
      const uploadResponse = await this.cloudinaryService.uploadFile(
        EUploadPath.AVATARS,
        file,
      );
      avatarURL = uploadResponse.url;
      avatarPublicId = uploadResponse.public_id;
    }
    const siteResume = `${process.env.SITE_CV}/${user.id}`;
    Object.assign(user, { ...body, avatarURL, avatarPublicId, siteResume });
    await this.userRepository.save(user);
    return await this.current(user.email);
  }

  // Get user
  private async getUser(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['roles', 'works', 'educations', 'projects', 'skills'],
    });
    if (!user) {
      throw new NotFoundException();
    }
    delete user.password;
    delete user.refreshToken;
    delete user.createAt;
    delete user.updateAt;
    delete user.verifyToken;
    return user;
  }
}
