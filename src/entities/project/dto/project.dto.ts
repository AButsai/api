import { ApiProperty } from '@nestjs/swagger';
import * as regex from '@src/constants/regex-expressions';
import { IsString, Matches, ValidateIf } from 'class-validator';

export class ProjectDto {
  @ApiProperty({
    example: 'https://github.com/user/my-repository',
    description: 'User GitHub url',
    required: false,
  })
  @ValidateIf((object, value) => value !== undefined && value !== '')
  @Matches(regex.linkRegex, {
    message: 'This should have been a link',
  })
  public gitHubLink: string;

  @ApiProperty({
    example: 'GitHub link',
    description: 'Name link for GitHub',
    required: false,
  })
  @ValidateIf((object, value) => value !== undefined && value !== '')
  @IsString()
  public gitHubNameLink: string;

  @ApiProperty({
    example: 'https://my-project.onrender.com/api/docs',
    description: 'Documentation link',
    required: false,
  })
  @ValidateIf((object, value) => value !== undefined && value !== '')
  @Matches(regex.linkRegex, {
    message: 'This should have been a link',
  })
  public documentationLink: string;

  @ApiProperty({
    example: 'https://my-project.netlify.app/',
    description: 'Project url',
    required: false,
  })
  @ValidateIf((object, value) => value !== undefined && value !== '')
  @Matches(regex.linkRegex, {
    message: 'This should have been a link',
  })
  public projectLink: string;

  @ApiProperty({
    example: 'GitHub link',
    description: 'Name link for project',
    required: false,
  })
  @ValidateIf((object, value) => value !== undefined && value !== '')
  @IsString()
  public projectNameLink: string;

  @ApiProperty({
    example: 'This service for add contacts....',
    description: 'Description projects',
    required: false,
  })
  @ValidateIf((object, value) => value !== undefined && value !== '')
  @IsString()
  public description: string;

  @ApiProperty({
    example: 'Цей прект для запису контактів...',
    description: 'Описання проекту',
    required: false,
  })
  @ValidateIf((object, value) => value !== undefined && value !== '')
  @IsString()
  public description_ua: string;

  @ApiProperty({
    example: 'Used: NestJs, Swagger, TypeOrm.....',
    description: 'How used technologies',
    required: false,
  })
  @ValidateIf((object, value) => value !== undefined && value !== '')
  @IsString()
  public technologies: string;
}

export class DeleteProjectResponseDto {
  @ApiProperty({
    example: 'Project experience deleted',
    description: 'Delete project experience',
  })
  message: string;
}
