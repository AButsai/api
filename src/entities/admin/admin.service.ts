import { EColorSchema, ESample } from '@entities/icons-svg/enums/icon-svg.enum';
import { UserEntity } from '@entities/users/users.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { checkEnumExist } from '@utils/checkEnumExist';
import { Repository } from 'typeorm';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  // Get all users
  public async getAllUsers(
    userId: number,
    page: number,
    limit: number,
    color: EColorSchema,
    sample: ESample,
  ) {
    if (page < 1) {
      throw new BadRequestException(
        'Page must be greater than 0. Example page=1',
      );
    }
    checkEnumExist(color, EColorSchema);
    checkEnumExist(sample, ESample);
    const [items, total] = await this.userRepository.findAndCount({
      where: {
        colorSchema: color ? color : null,
        sample: sample ? sample : null,
      },
      select: ['id', 'colorSchema', 'firstName', 'lastName', 'email', 'sample'],
      skip: (page - 1) * limit,
      take: limit,
    });
    return {
      items,
      total,
    };
  }
}
