import { ApiProperty } from '@nestjs/swagger';

export class CloudinaryDto {
  @ApiProperty({
    description: 'File to upload',
    type: 'file',
    format: 'binary',
  })
  files: Express.Multer.File;
}

export class CloudinaryResponseDto {
  @ApiProperty({ example: 'Images uploaded' })
  message: string;
}

export class CloudinaryResponseUpdateDto {
  @ApiProperty({ example: 'Images updated' })
  message: string;
}
