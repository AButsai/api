import { UserEntity } from '@entities/users/users.entity';
import { JwtGuardsModule } from '@guards/jwtGuard/jwt-auth.module';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EducationController } from './education.controller';
import { EducationEntity } from './education.entity';
import { EducationService } from './education.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, EducationEntity]),
    JwtGuardsModule,
  ],
  controllers: [EducationController],
  providers: [EducationService, ConfigService],
})
export class EducationModule {}
