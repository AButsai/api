import { ApiProperty } from '@nestjs/swagger';
import { IsArray, ValidateIf } from 'class-validator';

export class SkillsDto {
  @ApiProperty({
    example: ['HTML, CSS, JS, REACT'],
    description: 'Tech skills',
  })
  @ValidateIf((object, value) => value !== undefined)
  @IsArray()
  public techSkills: string[];

  @ApiProperty({
    example: ['Communication, Teamwork, Decision-making'],
    description: 'Soft skills',
  })
  @ValidateIf((object, value) => value !== undefined)
  @IsArray()
  public softSkills: string[];

  @ApiProperty({
    example: ['English — beginner, Ukrainian — native'],
    description: 'Language skills',
  })
  @ValidateIf((object, value) => value !== undefined)
  @IsArray()
  public languageSkills: string[];
}
