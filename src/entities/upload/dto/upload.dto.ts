import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UploadDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'File to upload',
  })
  @IsNotEmpty()
  file: Express.Multer.File;

  originalname: string;

  path: string;
}

export class ResponseUploadDto {
  @ApiProperty({
    example: '/avatars/avatar_pokemon.png',
    description: 'Url file',
  })
  avatar: string;
}
