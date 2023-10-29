import { ApiProperty } from '@nestjs/swagger';

export class CloudinaryDto {
  @ApiProperty({
    description: 'Array of files to upload',
    type: 'array',
    items: {
      type: 'string',
      format: 'binary',
    },
  })
  files: Express.Multer.File[];
}

export class CloudinaryResponseDto {
  @ApiProperty()
  asset_id: string;
  @ApiProperty()
  public_id: string;
  @ApiProperty()
  version: number;
  @ApiProperty()
  version_id: string;
  @ApiProperty()
  signature: string;
  @ApiProperty()
  width: number;
  @ApiProperty()
  height: number;
  @ApiProperty()
  format: string;
  @ApiProperty()
  resource_type: string;
  @ApiProperty()
  created_at: string;
  @ApiProperty()
  tags: [];
  @ApiProperty()
  bytes: number;
  @ApiProperty()
  type: string;
  @ApiProperty()
  etag: string;
  @ApiProperty()
  placeholder: boolean;
  @ApiProperty()
  url: string;
  @ApiProperty()
  secure_url: string;
  @ApiProperty()
  folder: string;
  @ApiProperty()
  original_filename: string;
  @ApiProperty()
  api_key: string;
}
