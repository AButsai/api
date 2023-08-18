import { EducationEntity } from '@entities/education/education.entity';
import { TokensModule } from '@entities/tokens/tokens.module';
import { WorkEntity } from '@entities/work/work.entity';
import { JwtGuardsModule } from '@guards/jwtGuard/jwt-auth.module';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UserEntity } from './users.entity';
import { UsersService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, WorkEntity, EducationEntity]),
    JwtGuardsModule,
    TokensModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, ConfigService],
  exports: [UsersService],
})
export class UsersModule {}
