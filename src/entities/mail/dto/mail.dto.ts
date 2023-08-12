import { ApiProperty } from '@nestjs/swagger';
import * as regex from '@utils/regex-expressions';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class EmailDto {
  @ApiProperty({
    example: 'user@email.com',
    description: 'User email',
  })
  @IsString()
  @IsEmail()
  email: string;
}

export class EmailSendResponseDto {
  @ApiProperty({ example: 'Email send', description: 'Email send' })
  message: string;
}

export class EmailResendResponseDto {
  @ApiProperty({ example: 'Email resend', description: 'Email resend' })
  message: string;
}

export class CheckEmailResponseDto {
  @ApiProperty({ example: true, description: 'Check email' })
  available: boolean;
}
