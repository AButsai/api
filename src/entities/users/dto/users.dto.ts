import { EducationDto } from '@entities/education/dto/education.dto';
import { ProjectDto } from '@entities/project/dto/project.dto';
import { WorkDto } from '@entities/work/dto/work.dto';
import { ApiProperty } from '@nestjs/swagger';
import * as regex from '@utils/regex-expressions';
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Matches,
  ValidateIf,
} from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ example: 'email@gmail.com', description: 'User  email' })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Mark', description: 'User First name' })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Павло', description: 'User First name' })
  @ValidateIf((object, value) => value !== undefined)
  @IsNotEmpty()
  @IsString()
  firstName_ua: string;

  @ApiProperty({ example: 'Spencer', description: 'User Last name' })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({ example: 'Наливайко', description: 'User Last name' })
  @ValidateIf((object, value) => value !== undefined)
  @IsNotEmpty()
  @IsString()
  lastName_ua: string;

  @ApiProperty({ example: '+380998887776', description: 'User contact phone' })
  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;

  @ApiProperty({
    example: 'https://t.me/name',
    description: 'User Telegram contact',
  })
  @IsNotEmpty()
  @Matches(regex.telegramRegex, {
    message: 'Telegram contact must be in the format "https://t.me/name"',
  })
  telegramContact: string;

  @ApiProperty({
    example: 'https://www.linkedin.com/in/user/',
    description: 'User linkedin url',
    required: true,
  })
  @IsNotEmpty()
  @Matches(regex.linkRegex, {
    message: 'This should have been a link',
  })
  linkedinUrl: string;

  @ApiProperty({
    example:
      'https://my-site.netlify.app?id=a70fdfe5-c1b5-4c1c-b603-b4847358d102',
    description: 'User site url',
    required: true,
  })
  @IsNotEmpty()
  @Matches(regex.linkRegex, {
    message: 'This should have been a link',
  })
  siteUrl: string;

  @ApiProperty({
    example: 'https://my-resume.netlify.app',
    description: 'Resume url',
    required: true,
  })
  @IsNotEmpty()
  @Matches(regex.linkRegex, {
    message: 'This should have been a link',
  })
  resumeUrl: string;

  @ApiProperty({
    example: 'Beginner/Elementary(A1)',
    description: 'English level',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  englishLevel: string;

  @ApiProperty({
    example: 'Native',
    description: 'Ukraine langue',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  public ukraineLangue: string;

  @ApiProperty({
    example: 'Native',
    description: 'Russian langue',
    required: true,
  })
  @ValidateIf((object, value) => value !== undefined)
  @IsNotEmpty()
  @IsString()
  public russianLangue: string;

  @ApiProperty({
    example: 'I`m FullStack developer...',
    description: 'Position user',
  })
  @IsNotEmpty()
  @IsString()
  public aboutMe: string;

  @ApiProperty({
    example: 'Я FullStack разробник...',
    description: 'Position user',
  })
  @ValidateIf((object, value) => value !== undefined)
  @IsNotEmpty()
  @IsString()
  public aboutMe_ua: string;
}

export class UpdateSampleColorSchemaDto {
  @ApiProperty({
    example: 'default',
    description: 'Color schema site',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  public colorSchema: string;

  @ApiProperty({
    example: 'default',
    description: 'Sample site',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  public sample: string;
}

export class UserResponseDto extends UpdateUserDto {
  @ApiProperty({ type: [WorkDto] })
  works: WorkDto;

  @ApiProperty({ type: [EducationDto] })
  educations: EducationDto;

  @ApiProperty({ type: [ProjectDto] })
  projects: ProjectDto;
}
export class ResponseDto {
  @ApiProperty({
    example: 'FGfchJHGfkJGC_kgjkvKGCKJc.HVKUyfkj...',
    description: 'accessToken',
  })
  accessToken: string;

  @ApiProperty({
    example: 'FGfchJHGfkJGC_kgjkvKGCKJc.HVKUyfkj...',
    description: 'refreshToken',
  })
  refreshToken: string;

  @ApiProperty({ type: UserResponseDto })
  user: UserResponseDto;
}
