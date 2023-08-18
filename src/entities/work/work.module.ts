import { UserEntity } from '@entities/users/users.entity';
import { JwtGuardsModule } from '@guards/jwtGuard/jwt-auth.module';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkController } from './work.controller';
import { WorkEntity } from './work.entity';
import { WorkService } from './work.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([WorkEntity, UserEntity]),
    JwtGuardsModule,
  ],
  controllers: [WorkController],
  providers: [WorkService, ConfigService],
})
export class WorkModule {}
