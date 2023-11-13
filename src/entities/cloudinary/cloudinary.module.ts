import { EducationEntity } from '@entities/education/education.entity';
import { ProjectEntity } from '@entities/project/project.entity';
import { UserEntity } from '@entities/users/users.entity';
import { JwtGuardsModule } from '@guards/jwtGuard/jwt-auth.module';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryProvider } from './cloudinary.provider';
import { CloudinaryService } from './cloudinary.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, ProjectEntity, EducationEntity]),
    JwtGuardsModule,
  ],
  providers: [CloudinaryService, CloudinaryProvider, ConfigService],
  exports: [CloudinaryService],
})
export class CloudinaryModule {}
