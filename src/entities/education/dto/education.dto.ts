import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class EducationDto {
  @ApiProperty({
    example: 'FullStack Developer',
    description: 'Taught the stack',
  })
  @IsString()
  @IsNotEmpty()
  public position: string;

  @ApiProperty({ example: 'GoIT', description: 'School name' })
  @IsString()
  @IsNotEmpty()
  public schoolName: string;

  @ApiProperty({ example: '01.01.2022', description: 'Start date work' })
  @IsString()
  @IsNotEmpty()
  public startDate: string;

  @ApiProperty({ example: '01.01.2023', description: 'End date work' })
  @IsString()
  @IsNotEmpty()
  public endDate: string;

  @ApiProperty({ example: 'Kyiv, Ukraine', description: 'Address school' })
  @IsString()
  @IsNotEmpty()
  address: string;
}

export class DeleteEducationResponseDto {
  @ApiProperty({
    example: 'Education deleted',
    description: 'Delete education',
  })
  message: string;
}
