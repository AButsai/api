import { UserEntity } from '@entities/users/users.entity';
import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokensController } from './tokens.controller';
import { TokensService } from './tokens.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [TokensController],
  providers: [TokensService, JwtService],
  exports: [TokensService],
})
export class TokensModule {}
