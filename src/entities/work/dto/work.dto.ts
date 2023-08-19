import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, ValidateIf } from 'class-validator';

export class WorkDto {
  @ApiProperty({ example: 'BackEnd Developer', description: 'User position' })
  @IsString()
  @IsNotEmpty()
  public position: string;

  @ApiProperty({ example: 'SoftRyzen', description: 'Compony name' })
  @IsString()
  @IsNotEmpty()
  public companyName: string;

  @ApiProperty({ example: '01.01.2022', description: 'Start date work' })
  @IsString()
  @IsNotEmpty()
  public startDate: string;

  @ApiProperty({ example: '01.01.2023', description: 'End date work' })
  @IsString()
  @IsNotEmpty()
  public endDate: string;

  @ApiProperty({
    example: 'Server-side development.',
    description: 'Description Work',
  })
  @IsString()
  @IsNotEmpty()
  public descriptionWork: string;

  @ApiProperty({
    example: 'Апі для збереження контактів',
    description: 'Для чого цей застосунок',
  })
  @ValidateIf((object, value) => value !== undefined)
  @IsString()
  @IsNotEmpty()
  public descriptionWork_ua: string;

  @ApiProperty({
    example: 'Used: NestJS, TypeORM ...',
    description: 'Used technologies',
  })
  @IsString()
  @IsNotEmpty()
  public technologies: string;
}

export class DeleteWorkResponseDto {
  @ApiProperty({
    example: 'Work experience deleted',
    description: 'Delete work experience',
  })
  message: string;
}
