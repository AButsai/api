import { ApiProperty } from '@nestjs/swagger';
import { ERole } from '@src/enums/role.enum';
import { MyBaseEntity } from '@utils/base.entity';
import { Column, Entity, ManyToMany, ManyToOne } from 'typeorm';
import { UserEntity } from './users.entity';

@Entity('roles')
export class RoleEntity extends MyBaseEntity {
  @ApiProperty({ example: '[user]', description: 'User`s roles' })
  @Column({ name: 'user_role', type: 'enum', enum: ERole })
  public role: ERole;

  @ManyToOne(() => UserEntity, (user) => user.roles)
  public users: UserEntity;
}
