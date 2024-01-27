import {
  EColorSchema,
  ENameContacts,
  ESample,
} from '@entities/icons-svg/enums/icon-svg.enum';
import { IconsSvgEntity } from '@entities/icons-svg/icons-svg.entity';
import { UserEntity } from '@entities/users/users.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';

@Injectable()
export class UserDataService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(IconsSvgEntity)
    private readonly iconsSvgRepository: Repository<IconsSvgEntity>,
  ) {}
  // Get user data by id
  public async getUserById(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['works', 'educations', 'projects'],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const sample = user.sample as ESample;
    const colorSchema = user.colorSchema as EColorSchema;

    const userData = {
      id: user.id,
      avatarURL: user.avatarURL,
      firstName: user.firstName,
      firstName_ua: user.firstName_ua,
      lastName: user.lastName,
      lastName_ua: user.lastName_ua,
      position: user.position,
      aboutMe: user.aboutMe,
      aboutMe_ua: user.aboutMe_ua,
      englishLevel: user.englishLevel,
      ukraineLangue: user.ukraineLangue,
      russianLangue: user.russianLangue,
      sample: user.sample,
      colorSchema: user.colorSchema,
      verified: user.verified,
      siteResume: user.siteResume,
      resume: user.resume,
      contacts: [
        {
          id: v4(),
          name: user.email,
          link: `mailto:${user.email}`,
          svg: await this.getIcon(ENameContacts.EMAIL, sample, colorSchema),
        },
        {
          id: v4(),
          name: user.phone,
          link: `tel:${user.phone}`,
          svg: await this.getIcon(ENameContacts.PHONE, sample, colorSchema),
        },
        {
          id: v4(),
          name: 'Telegram',
          link: user.telegram,
          svg: await this.getIcon(ENameContacts.TELEGRAM, sample, colorSchema),
        },
        {
          id: v4(),
          name: 'Viber',
          link: user.viber,
          svg: await this.getIcon(ENameContacts.VIBER, sample, colorSchema),
        },
        {
          id: v4(),
          name: 'WhatsApp',
          link: user.whatsapp,
          svg: await this.getIcon(ENameContacts.WATS_UP, sample, colorSchema),
        },
      ],
      social: [
        {
          id: v4(),
          name: 'Instagram',
          link: user.instagram,
          svg: await this.getIcon(ENameContacts.INSTAGRAM, sample, colorSchema),
        },
        {
          id: v4(),
          name: 'Linkedin',
          link: user.linkedin,
          svg: await this.getIcon(ENameContacts.LINKEDIN, sample, colorSchema),
        },
        {
          id: v4(),
          name: 'GitHub',
          link: user.github,
          svg: await this.getIcon(ENameContacts.GIT_HUB, sample, colorSchema),
        },
        {
          id: v4(),
          name: 'Facebook',
          link: user.facebook,
          svg: await this.getIcon(ENameContacts.FACEBOOK, sample, colorSchema),
        },
      ],

      works: user.works,
      educations: user.educations,
      projects: user.projects,
    };

    return { user: userData };
  }

  // Get icon
  private async getIcon(
    name: ENameContacts,
    sample: ESample,
    color: EColorSchema,
  ) {
    const icon = await this.iconsSvgRepository.findOne({
      where: {
        name,
        sample,
        colorSchema: color,
      },
    });
    if (!icon) {
      return null;
    }
    return icon.svg;
  }
}
