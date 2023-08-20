import { UserEntity } from '@entities/users/users.entity';
import { JwtGuardsModule } from '@guards/jwtGuard/jwt-auth.module';
import { RoleGuardsModule } from '@guards/roleGuard/role.module';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IconsSvgController } from './icons-svg.controller';
import { IconsSvgEntity } from './icons-svg.entity';
import { IconsSvgService } from './icons-svg.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([IconsSvgEntity, UserEntity]),
    JwtGuardsModule,
    RoleGuardsModule,
  ],
  controllers: [IconsSvgController],
  providers: [IconsSvgService, ConfigService],
})
export class IconsSvgModule {}
