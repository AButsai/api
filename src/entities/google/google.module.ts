import { TokensModule } from '@entities/tokens/tokens.module';
import { RoleEntity } from '@entities/users/role.entity';
import { UserEntity } from '@entities/users/users.entity';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoogleStrategy } from '@src/strategy/google.strategy';
import { GoogleController } from './google.controller';
import { GoogleService } from './google.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, RoleEntity]), TokensModule],
  controllers: [GoogleController],
  providers: [GoogleService, ConfigService, GoogleStrategy],
})
export class GoogleModule {}
