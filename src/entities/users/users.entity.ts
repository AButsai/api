import { EducationEntity } from '@entities/education/education.entity';
import { ProjectEntity } from '@entities/project/project.entity';
import { WorkEntity } from '@entities/work/work.entity';
import { ApiProperty } from '@nestjs/swagger';
import { MyBaseEntity } from '@utils/base.entity';
import * as regex from '@utils/regex-expressions';
import { Matches, MinLength } from 'class-validator';
import { Column, Entity, OneToMany, Unique } from 'typeorm';
import { RoleEntity } from './role.entity';

@Entity('users')
export class UserEntity extends MyBaseEntity {
  @ApiProperty({ example: 'email', description: 'User  email' })
  @Column({ name: 'email', type: 'varchar' })
  @Unique(['email'])
  public email: string;

  @ApiProperty({ example: 'User password', description: 'User  password' })
  @Column({ name: 'password', type: 'varchar', nullable: true })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @Matches(regex.passwordRegex, {
    message: 'Password must contain letters and numbers',
  })
  public password: string;

  @ApiProperty({ example: 'URL', description: 'User avatar' })
  @Column({ name: 'avatar_url', type: 'varchar', nullable: true })
  public avatarURL: string;

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

  @ApiProperty({ example: 'contactPhone', description: 'User contact phone' })
  @Column({ name: 'phone', type: 'varchar', nullable: true })
  @Unique(['phone'])
  @Matches(regex.phoneRegex, {
    message: 'Contact phone must be in the format "+380XXXXXXXXX"',
  })
  public phone: string;

  @ApiProperty({
    example: 'Telegram contact',
    description: 'User Telegram contact',
  })
  @Column({ name: 'telegram_contact', type: 'varchar', nullable: true })
  @Matches(regex.telegramRegex, {
    message: 'Telegram contact must be in the format "https://t.me/name"',
  })
  public telegramContact: string;

  @ApiProperty({
    example: 'https://www.linkedin.com/in/user/',
    description: 'User linkedin url',
    required: true,
  })
  @Column({ name: 'linkedin_url', type: 'varchar', nullable: true })
  @Matches(regex.linkRegex, {
    message: 'This should have been a link',
  })
  public linkedinUrl: string;

  @ApiProperty({
    example: 'https://github.com/user',
    description: 'User gitHub url',
    required: true,
  })
  @Column({ name: 'git_url', type: 'varchar', nullable: true })
  @Matches(regex.linkRegex, {
    message: 'This should have been a link',
  })
  public gitUrl: string;

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
    example: 'resume url',
    description: 'Resume url',
    required: true,
  })
  @Column({ name: 'resume_url', type: 'varchar', nullable: true })
  @Matches(regex.linkRegex, {
    message: 'This should have been a link',
  })
  public resumeUrl: string;

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

  @OneToMany(() => RoleEntity, (roles) => roles.users)
  public roles: RoleEntity[];

  @OneToMany(() => WorkEntity, (work) => work.user)
  public works: WorkEntity[];

  @OneToMany(() => EducationEntity, (education) => education.user)
  public educations: EducationEntity[];

  @OneToMany(() => ProjectEntity, (project) => project.user)
  public projects: ProjectEntity[];
}
