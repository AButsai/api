import { JwtGuardsModule } from '@guards/jwtGuard/jwt-auth.module';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkillsController } from './skills.controller';
import { SkillsEntity } from './skills.entity';
import { SkillsService } from './skills.service';
import { UserEntity } from '@entities/users/users.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SkillsEntity, UserEntity]),
    JwtGuardsModule,
  ],
  controllers: [SkillsController],
  providers: [SkillsService, ConfigService],
})
export class SkillsModule {}
