import { UserEntity } from '@entities/users/users.entity';
import { ApiProperty } from '@nestjs/swagger';
import { MyBaseEntity } from '@utils/base.entity';
import * as regex from '@utils/regex-expressions';
import { IsNotEmpty, IsString, Matches, ValidateIf } from 'class-validator';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('projects')
export class ProjectEntity extends MyBaseEntity {
  @ApiProperty({
    example: 'https://github.com/user/my-repository',
    description: 'User GitHub url',
    required: false,
  })
  @IsNotEmpty()
  @Matches(regex.linkRegex, {
    message: 'This should have been a link',
  })
  @Column({ name: 'git_link', type: 'varchar', nullable: true })
  @ValidateIf((object, value) => value !== undefined || value !== '')
  public gitHubLink: string;

  @ApiProperty({
    example: 'GitHub link',
    description: 'Name link for GitHub',
    required: false,
  })
  @ValidateIf((object, value) => value !== undefined || value !== '')
  @IsNotEmpty()
  @IsString()
  @Column({ name: 'name_git_link', type: 'varchar', nullable: true })
  public gitHubNameLink: string;

  @ApiProperty({
    example: 'https://my-project.onrender.com/api/docs',
    description: 'Documentation link',
    required: false,
  })
  @ValidateIf((object, value) => value !== undefined || value !== '')
  @IsNotEmpty()
  @Matches(regex.linkRegex, {
    message: 'This should have been a link',
  })
  @Column({ name: 'documentation_link', type: 'varchar', nullable: true })
  public documentationLink: string;

  @ApiProperty({
    example: 'https://my-project.netlify.app/',
    description: 'Project url',
    required: false,
  })
  @ValidateIf((object, value) => value !== undefined || value !== '')
  @IsNotEmpty()
  @Matches(regex.linkRegex, {
    message: 'This should have been a link',
  })
  @Column({ name: 'project_link', type: 'varchar', nullable: true })
  public projectLink: string;

  @ApiProperty({
    example: 'GitHub link',
    description: 'Name link for project',
    required: false,
  })
  @ValidateIf((object, value) => value !== undefined || value !== '')
  @IsNotEmpty()
  @IsString()
  @Column({ name: 'name_project_link', type: 'varchar', nullable: true })
  public projectNameLink: string;

  @ApiProperty({
    example: 'This service for add contacts....',
    description: 'Description projects',
    required: false,
  })
  @ValidateIf((object, value) => value !== undefined || value !== '')
  @IsNotEmpty()
  @IsString()
  @Column({ name: 'description', type: 'varchar', nullable: true })
  public description: string;

  @ApiProperty({
    example: 'This service for add contacts....',
    description: 'Description projects',
    required: false,
  })
  @ValidateIf((object, value) => value !== undefined || value !== '')
  @IsNotEmpty()
  @IsString()
  @Column({ name: 'description_ua', type: 'varchar', nullable: true })
  public description_ua: string;

  @ApiProperty({
    example: 'Used: NestJs, Swagger, TypeOrm.....',
    description: 'How used technologies',
    required: false,
  })
  @ValidateIf((object, value) => value !== undefined || value !== '')
  @IsNotEmpty()
  @IsString()
  @Column({ name: 'technologies', type: 'varchar', nullable: true })
  public technologies: string;

  @ManyToOne(() => UserEntity, (user) => user.projects, { onDelete: 'CASCADE' })
  public user: UserEntity;
}
