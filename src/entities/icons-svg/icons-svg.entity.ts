import { ApiProperty } from '@nestjs/swagger';
import { MyBaseEntity } from '@utils/base.entity';
import { Column, Entity } from 'typeorm';
import { EColorSchema, ENameContacts, ESample } from './enums/icon-svg.enum';

@Entity('icons_svg')
export class IconsSvgEntity extends MyBaseEntity {
  @ApiProperty({
    example: 'phone',
    description: 'Name icon',
  })
  @Column({ name: 'name', type: 'enum', enum: ENameContacts, nullable: true })
  name: ENameContacts;

  @ApiProperty({
    example: 'default',
    description: 'Color schema site',
    required: true,
  })
  @Column({
    name: 'color_schema',
    type: 'enum',
    enum: EColorSchema,
    nullable: true,
  })
  colorSchema: EColorSchema;

  @ApiProperty({
    example: 'default',
    description: 'Color schema site',
    required: true,
  })
  @Column({
    name: 'sample',
    type: 'enum',
    enum: ESample,
    nullable: true,
  })
  sample: ESample;

  @ApiProperty({
    example: 'svg code',
    description: 'Svg code',
    required: true,
  })
  @Column({ name: 'svg_code', type: 'varchar', nullable: true })
  svg: string;

  @ApiProperty({
    example: 'admin id',
    description: 'Admin id',
    required: true,
  })
  @Column({ name: 'owner_id', type: 'varchar', nullable: true })
  ownerId: string;
}
