import { IconsSvgEntity } from '@entities/icons-svg/icons-svg.entity';
import { UserEntity } from '@entities/users/users.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserDataController } from './user-data.controller';
import { UserDataService } from './user-data.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, IconsSvgEntity])],
  controllers: [UserDataController],
  providers: [UserDataService],
})
export class UserDataModule {}
