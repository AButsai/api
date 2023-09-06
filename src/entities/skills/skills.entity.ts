import { UserEntity } from '@entities/users/users.entity';
import { ApiProperty } from '@nestjs/swagger';
import { MyBaseEntity } from '@utils/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('skills')
export class SkillsEntity extends MyBaseEntity {
  @ApiProperty({ example: 'HTML, CSS, JS, REACT', description: 'Tech skills' })
  @Column({ name: 'tech_skills', type: 'varchar', array: true, nullable: true })
  public techSkills: string[];

  @ApiProperty({
    example: 'Communication, Teamwork, Decision-making',
    description: 'Soft skills',
  })
  @Column({ name: 'soft_skills', type: 'varchar', array: true, nullable: true })
  public softSkills: string[];

  @ApiProperty({
    example: 'English — beginner, Ukrainian — native',
    description: 'Language skills',
  })
  @Column({
    name: 'language_skills',
    type: 'varchar',
    array: true,
    nullable: true,
  })
  public languageSkills: string[];

  @ManyToOne(() => UserEntity, (user) => user.skills, { onDelete: 'CASCADE' })
  public user: UserEntity;
}
