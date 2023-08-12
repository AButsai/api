import { RoleEntity } from '@entities/users/role.entity';
import { UserEntity } from '@entities/users/users.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoogleController } from './google.controller';
import { GoogleService } from './google.service';
import { TokensModule } from '@entities/tokens/tokens.module';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, RoleEntity]), TokensModule],
  controllers: [GoogleController],
  providers: [GoogleService, ConfigService],
})
export class GoogleModule {}
