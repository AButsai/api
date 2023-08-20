import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { EColorSchema, ENameContacts, ESample } from '../enums/icon-svg.enum';

export class IconsSvgDto {
  @ApiProperty({
    example: 'phone',
    description: 'Name icon',
    enum: ENameContacts,
    required: true,
  })
  @IsNotEmpty()
  @IsEnum(ENameContacts)
  name: ENameContacts;

  @ApiProperty({
    example: 'default',
    description: 'Color schema site',
    enum: EColorSchema,
    required: true,
  })
  @IsNotEmpty()
  @IsEnum(EColorSchema)
  colorSchema: EColorSchema;

  @ApiProperty({
    example: 'default',
    description: 'Color schema site',
    enum: ESample,
    required: true,
  })
  @IsNotEmpty()
  @IsEnum(ESample)
  sample: ESample;

  @ApiProperty({
    example: 'svg code',
    description: 'Svg code',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  svg: string;
}

export class IconsSvgResponseDto {
  @ApiProperty({
    example: 'Icon deleted',
    description: 'Delete icon',
  })
  message: string;
}
