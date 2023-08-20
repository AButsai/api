import { UserEntity } from '@entities/users/users.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { checkEnumExist } from '@utils/checkEnumExist';
import { Repository } from 'typeorm';
import { IconsSvgDto } from './dto/icons-svg.dto';
import { EColorSchema, ENameContacts } from './enums/icon-svg.enum';
import { IconsSvgEntity } from './icons-svg.entity';

@Injectable()
export class IconsSvgService {
  constructor(
    @InjectRepository(IconsSvgEntity)
    private readonly iconSvgRepository: Repository<IconsSvgEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  // Add icon
  public async addIcon(userId: string, body: IconsSvgDto) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException();
    }
    const newIcon = this.iconSvgRepository.create({
      ...body,
      ownerId: user.id,
    });
    await this.iconSvgRepository.save(newIcon);
    return newIcon;
  }

  // Update icon
  public async updateIcon(iconId: string, body: IconsSvgDto) {
    const icon = await this.iconSvgRepository.findOne({
      where: { id: iconId },
    });
    if (!icon) {
      throw new NotFoundException();
    }
    Object.assign(icon, body);
    await this.iconSvgRepository.save(icon);
    return icon;
  }

  // Get icon by sort name or colorSchema
  public async getAllIcons(
    userId: string,
    name: ENameContacts,
    color: EColorSchema,
  ) {
    checkEnumExist(color, ENameContacts);
    checkEnumExist(color, EColorSchema);
    const [items, total] = await this.iconSvgRepository.findAndCount({
      where: {
        ownerId: userId,
        name: name ? name : null,
        colorSchema: color ? color : null,
      },
    });
    return {
      items,
      total,
    };
  }

  // Delete icon
  public async deleteIcon(iconId: string) {
    await this.iconSvgRepository.delete(iconId);
    return { message: 'Icon deleted' };
  }
}
