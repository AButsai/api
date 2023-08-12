import { AttemptsModule } from '@entities/attempts/attempts.module';
import { BlockIpMiddleware } from '@entities/attempts/middleware/attempts.middleware';
import { MailModule } from '@entities/mail/mail.module';
import { TokensModule } from '@entities/tokens/tokens.module';
import { RoleEntity } from '@entities/users/role.entity';
import { UserEntity } from '@entities/users/users.entity';
import { JwtGuardsModule } from '@guards/jwtGuard/jwt-auth.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, RoleEntity]),
    JwtGuardsModule,
    AttemptsModule,
    TokensModule,
    MailModule,
  ],
  providers: [AuthService, ConfigService],
  controllers: [AuthController],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(BlockIpMiddleware).forRoutes('api/auth/login');
  }
}
