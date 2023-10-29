import { JwtGuardsModule } from '@guards/jwtGuard/jwt-auth.module';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CloudinaryController } from './cloudinary.controller';
import { CloudinaryProvider } from './cloudinary.provider';
import { CloudinaryService } from './cloudinary.service';

@Module({
  imports: [JwtGuardsModule],
  controllers: [CloudinaryController],
  providers: [CloudinaryService, CloudinaryProvider, ConfigService],
  exports: [CloudinaryService],
})
export class CloudinaryModule {}
