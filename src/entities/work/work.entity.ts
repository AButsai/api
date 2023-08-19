import { UserEntity } from '@entities/users/users.entity';
import { ApiProperty } from '@nestjs/swagger';
import { MyBaseEntity } from '@utils/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('works')
export class WorkEntity extends MyBaseEntity {
  @ApiProperty({ example: 'BackEnd Developer', description: 'User position' })
  @Column({ name: 'position', type: 'varchar', nullable: true })
  public position: string;

  @ApiProperty({ example: 'SoftRyzen', description: 'Compony name' })
  @Column({ name: 'company_name', type: 'varchar', nullable: true })
  public companyName: string;

  @ApiProperty({ example: '01.01.2022', description: 'Start date work' })
  @Column({ name: 'start_date', type: 'varchar', nullable: true })
  public startDate: string;

  @ApiProperty({ example: '01.01.2023', description: 'End date work' })
  @Column({ name: 'end_date', type: 'varchar', nullable: true })
  public endDate: string;

  @ApiProperty({
    example: 'Server-side development.',
    description: 'Description Work',
  })
  @Column({ name: 'description_work', type: 'varchar', nullable: true })
  public descriptionWork: string;

  @ApiProperty({
    example: 'Server-side development.',
    description: 'Description Work',
  })
  @Column({ name: 'description_work_ua', type: 'varchar', nullable: true })
  public descriptionWork_ua: string;

  @ApiProperty({
    example: 'Used: NestJS, TypeORM ...',
    description: 'Used technologies',
  })
  @Column({ name: 'technologies', type: 'varchar', nullable: true })
  public technologies: string;

  @ManyToOne(() => UserEntity, (user) => user.works, { onDelete: 'CASCADE' })
  public user: UserEntity;
}
