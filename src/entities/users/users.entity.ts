import { EducationEntity } from '@entities/education/education.entity';
import { ProjectEntity } from '@entities/project/project.entity';
import { SkillsEntity } from '@entities/skills/skills.entity';
import { WorkEntity } from '@entities/work/work.entity';
import { ApiProperty } from '@nestjs/swagger';
import { MyBaseEntity } from '@src/base/base.entity';
import * as regex from '@src/constants/regex-expressions';
import { Matches, MinLength, ValidateIf } from 'class-validator';
import { Column, Entity, OneToMany, Unique } from 'typeorm';
import { RoleEntity } from './role.entity';

@Entity('users')
export class UserEntity extends MyBaseEntity {
  @ApiProperty({ example: 'User password', description: 'User  password' })
  @Column({ name: 'password', type: 'varchar', nullable: true })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @Matches(regex.passwordRegex, {
    message: 'Password must contain letters and numbers',
  })
  public password: string;

  // Data
  @ApiProperty({
    example: 'avatars/uhyuxeaffdmz01ldiuma',
    description: 'Avatar public id',
  })
  @Column({ name: 'avatar_url', type: 'varchar', nullable: true })
  public avatarURL: string;

  @ApiProperty({ example: 'URL', description: 'User avatar' })
  @Column({ name: 'avatar_public_id', type: 'varchar', nullable: true })
  public avatarPublicId: string;

  @ApiProperty({ example: 'Mark', description: 'User First name' })
  @Column({ name: 'first_name', type: 'varchar', nullable: true })
  public firstName: string;

  @ApiProperty({ example: 'Mark', description: 'User First name' })
  @Column({ name: 'first_name_ua', type: 'varchar', nullable: true })
  public firstName_ua: string;

  @ApiProperty({ example: 'Spencer', description: 'User Last name' })
  @Column({ name: 'last_name', type: 'varchar', nullable: true })
  public lastName: string;

  @ApiProperty({ example: 'Spencer', description: 'User Last name' })
  @Column({ name: 'last_name_ua', type: 'varchar', nullable: true })
  public lastName_ua: string;

  @ApiProperty({ example: 'FrontEnd', description: 'Position user' })
  @Column({ name: 'position', type: 'varchar', nullable: true })
  public position: string;

  @ApiProperty({
    example: 'I`m FullStack developer...',
    description: 'Position user',
  })
  @Column({ name: 'about_me', type: 'varchar', nullable: true })
  public aboutMe: string;

  @ApiProperty({
    example: 'I`m FullStack developer...',
    description: 'Position user',
  })
  @Column({ name: 'about_me_ua', type: 'varchar', nullable: true })
  public aboutMe_ua: string;

  @ApiProperty({
    example: 'Beginner/Elementary(A1)',
    description: 'English level',
    required: true,
  })
  @Column({ name: 'english_level', type: 'varchar', nullable: true })
  public englishLevel: string;

  @ApiProperty({
    example: 'Native',
    description: 'Ukraine langue',
    required: true,
  })
  @Column({ name: 'ukraine_langue', type: 'varchar', nullable: true })
  public ukraineLangue: string;

  @ApiProperty({
    example: 'Native',
    description: 'Russian langue',
    required: true,
  })
  @Column({ name: 'russian_langue', type: 'varchar', nullable: true })
  public russianLangue: string;

  @ApiProperty({
    example: 'default',
    description: 'Sample site',
    required: true,
  })
  @Column({ name: 'sample', type: 'varchar', nullable: true })
  public sample: string;

  @ApiProperty({
    example: 'default',
    description: 'Color schema site',
    required: true,
  })
  @Column({ name: 'color_schema', type: 'varchar', nullable: true })
  public colorSchema: string;

  @ApiProperty({ example: false, description: 'Is verified user' })
  @Column({ name: 'verified', type: 'boolean', default: false })
  public verified: boolean;

  @ApiProperty({ example: 'Verify token', description: 'Verify token' })
  @Column({ name: 'verify_token', type: 'varchar', default: null })
  public verifyToken: string;

  @ApiProperty({ example: 'Refresh token', description: ' Refresh  token' })
  @Column({ name: 'refresh_token', type: 'varchar', nullable: true })
  public refreshToken: string;

  @ApiProperty({
    example:
      'https://my-site.netlify.app?id=a70fdfe5-c1b5-4c1c-b603-b4847358d102',
    description: 'User gitHub url',
    required: true,
  })
  @Column({ name: 'site_resume', type: 'varchar', nullable: true })
  @ValidateIf((object, value) => value !== undefined && value !== '')
  @Matches(regex.linkRegex, {
    message: 'This should have been a link',
  })
  public siteResume: string;

  @ApiProperty({
    example: 'https://drive.google.com/drive/u/0/my-drive',
    description: 'Resume url',
    required: true,
  })
  @Column({ name: 'resume', type: 'varchar', nullable: true })
  @ValidateIf((object, value) => value !== undefined && value !== '')
  @Matches(regex.linkRegex, {
    message: 'This should have been a link',
  })
  public resume: string;

  @ApiProperty({ example: false, description: 'User agreement' })
  @Column({ name: 'user_agreement', type: 'boolean', default: false })
  public userAgreement: boolean;

  @ApiProperty({ example: false, description: 'Consent of use' })
  @Column({ name: 'consent_of_use', type: 'boolean', default: false })
  public consentOfUse: boolean;

  // Contacts and social
  @ApiProperty({ example: 'email@mail.com', description: 'User  email' })
  @Column({ name: 'email', type: 'varchar' })
  @Unique(['email'])
  public email: string;

  @ApiProperty({ example: '+380999999999', description: 'User contact phone' })
  @Column({ name: 'phone', type: 'varchar', nullable: true })
  @ValidateIf((object, value) => value !== undefined && value !== '')
  @Matches(regex.phoneRegex, {
    message: 'Contact phone must be in the format "+380999999999" phone',
  })
  public phone: string;

  @ApiProperty({
    example: 'https://t.me/name',
    description: 'User Telegram contact',
  })
  @Column({ name: 'telegram', type: 'varchar', nullable: true })
  @ValidateIf((object, value) => value !== undefined && value !== '')
  @Matches(regex.telegramRegex, {
    message: 'Telegram contact must be in the format "https://t.me/name"',
  })
  public telegram: string;

  @ApiProperty({
    example: 'https://www.linkedin.com/in/user/',
    description: 'User linkedin url',
    required: true,
  })
  @Column({ name: 'linkedin', type: 'varchar', nullable: true })
  @ValidateIf((object, value) => value !== undefined && value !== '')
  @Matches(regex.linkRegex, {
    message: 'This should have been a link linkedin',
  })
  public linkedin: string;

  @ApiProperty({
    example: 'https://github.com/user',
    description: 'User gitHub url',
    required: true,
  })
  @Column({ name: 'github', type: 'varchar', nullable: true })
  @ValidateIf((object, value) => value !== undefined && value !== '')
  @Matches(regex.linkRegex, {
    message: 'This should have been a link github',
  })
  public github: string;

  @ApiProperty({
    example: 'https://www.facebook.com/profile.php',
    description: 'User facebook url',
    required: true,
  })
  @Column({ name: 'facebook', type: 'varchar', nullable: true })
  @ValidateIf((object, value) => value !== undefined && value !== '')
  @Matches(regex.linkRegex, {
    message: 'This should have been a link facebook',
  })
  public facebook: string;

  @ApiProperty({
    example: 'https://www.instagram.com',
    description: 'User instagram url',
    required: true,
  })
  @Column({ name: 'instagram', type: 'varchar', nullable: true })
  @ValidateIf((object, value) => value !== undefined && value !== '')
  @Matches(regex.linkRegex, {
    message: 'This should have been a link instagram',
  })
  public instagram: string;

  @ApiProperty({ example: '+380999999999', description: 'User contact viber' })
  @Column({ name: 'viber', type: 'varchar', nullable: true })
  @ValidateIf((object, value) => value !== undefined && value !== '')
  @Matches(regex.phoneRegex, {
    message: 'Contact phone must be in the format "+380999999999" viber',
  })
  public viber: string;

  @ApiProperty({
    example: '+380999999999',
    description: 'User contact whatsapp',
  })
  @Column({ name: 'whatsapp', type: 'varchar', nullable: true })
  @ValidateIf((object, value) => value !== undefined && value !== '')
  @Matches(regex.phoneRegex, {
    message: 'Contact phone must be in the format "+380999999999" whatsapp',
  })
  public whatsapp: string;

  // Entities
  @OneToMany(() => RoleEntity, (roles) => roles.users)
  public roles: RoleEntity[];

  @OneToMany(() => WorkEntity, (work) => work.user)
  public works: WorkEntity[];

  @OneToMany(() => EducationEntity, (education) => education.user)
  public educations: EducationEntity[];

  @OneToMany(() => ProjectEntity, (project) => project.user)
  public projects: ProjectEntity[];

  @OneToMany(() => SkillsEntity, (skill) => skill.user)
  public skills: SkillsEntity;
}
