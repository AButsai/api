import { ApiProperty } from '@nestjs/swagger';
import * as regex from '@utils/regex-expressions';
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Matches,
} from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ example: 'email', description: 'User  email' })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Mark', description: 'User First name' })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Spencer', description: 'User Last name' })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({ example: '+380XXXXXXXXX', description: 'User contact phone' })
  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;

  @ApiProperty({
    example: 'Telegram contact',
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
    example: 'resume url',
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
}

export class UserResponseDto {
  @ApiProperty({ example: 'email', description: 'User  email' })
  public email: string;

  @ApiProperty({ example: 'User password', description: 'User  password' })
  public password: string;

  @ApiProperty({ example: 'URL', description: 'User avatar' })
  public avatarURL: string;

  @ApiProperty({ example: 'Mark', description: 'User First name' })
  public firstName: string;

  @ApiProperty({ example: 'Spencer', description: 'User Last name' })
  public lastName: string;

  @ApiProperty({ example: 'contactPhone', description: 'User contact phone' })
  public phone: string;

  @ApiProperty({
    example: 'Telegram contact',
    description: 'User Telegram contact',
  })
  public telegramContact: string;

  @ApiProperty({
    example: 'https://www.linkedin.com/in/user/',
    description: 'User linkedin url',
    required: true,
  })
  public linkedinUrl: string;

  @ApiProperty({
    example: 'https://github.com/user',
    description: 'User gitHub url',
    required: true,
  })
  public gitUrl: string;

  @ApiProperty({
    example: 'Beginner/Elementary(A1)',
    description: 'English level',
    required: true,
  })
  public englishLevel: string;

  @ApiProperty({
    example: 'resume url',
    description: 'Resume url',
    required: true,
  })
  public resumeUrl: string;

  @ApiProperty({ example: false, description: 'Is verified user' })
  public verified: boolean;
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
