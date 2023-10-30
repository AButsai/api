import { UserEntity } from '@entities/users/users.entity';
import { ApiProperty } from '@nestjs/swagger';
import { MyBaseEntity } from '@src/base/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('educations')
export class EducationEntity extends MyBaseEntity {
  @ApiProperty({
    example: 'FullStack Developer',
    description: 'Taught the stack',
  })
  @Column({ name: 'position', type: 'varchar', nullable: true })
  public position: string;

  @ApiProperty({ example: 'GoIT', description: 'School name' })
  @Column({ name: 'school_name', type: 'varchar', nullable: true })
  public schoolName: string;

  @ApiProperty({ example: '01.01.2022', description: 'Start date work' })
  @Column({ name: 'start_date', type: 'varchar', nullable: true })
  public startDate: string;

  @ApiProperty({ example: '01.01.2023', description: 'End date work' })
  @Column({ name: 'end_date', type: 'varchar', nullable: true })
  public endDate: string;

  @ApiProperty({ example: 'Kyiv, Ukraine', description: 'Address school' })
  @Column({ name: 'address', type: 'varchar', nullable: true })
  public address: string;

  @ApiProperty({
    example: 'http://res.cloudinary.com/.../qemiuqqppytvhykxsqfs.jpg',
    description: 'Image URL',
  })
  @Column({ name: 'image_url', type: 'varchar', nullable: true })
  public imageUrl: string;

  @ApiProperty({
    example: 'educations/qemiuqqppytvhykxsqfs',
    description: 'Education img id',
  })
  @Column({ name: 'public_id', type: 'varchar', nullable: true })
  public publicImageId: string;

  @ManyToOne(() => UserEntity, (user) => user.educations, {
    onDelete: 'CASCADE',
  })
  public user: UserEntity;
}
