import { TokensService } from '@entities/tokens/tokens.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  UpdateSampleColorSchemaDto,
  UpdateUserAgreementDto,
  UpdateUserDto,
} from './dto/users.dto';
import { UserEntity } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly tokensService: TokensService,
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
    id: string,
    body: UpdateUserDto | UpdateSampleColorSchemaDto | UpdateUserAgreementDto,
  ) {
    const user = await this.userRepository.findOne({ where: { id } });
    Object.assign(user, body);
    await this.userRepository.save(user);
    return await this.current(user.email);
  }

  // Get user
  private async getUser(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['roles', 'works', 'educations', 'projects'],
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
