import { UserEntity } from '@entities/users/users.entity';
import { JwtGuardsModule } from '@guards/jwtGuard/jwt-auth.module';
import { RoleGuardsModule } from '@guards/roleGuard/role.module';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtGuardsModule,
    RoleGuardsModule,
  ],
  controllers: [AdminController],
  providers: [AdminService, ConfigService],
})
export class AdminModule {}
