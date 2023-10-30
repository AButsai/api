import { TypeOrmModule } from '@db/typeorm.config';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AdminModule } from './entities/admin/admin.module';
import { AttemptsModule } from './entities/attempts/attempts.module';
import { AuthModule } from './entities/auth/auth.module';
import { CloudinaryModule } from './entities/cloudinary/cloudinary.module';
import { EducationModule } from './entities/education/education.module';
import { GoogleModule } from './entities/google/google.module';
import { IconsSvgModule } from './entities/icons-svg/icons-svg.module';
import { MailModule } from './entities/mail/mail.module';
import { PasswordModule } from './entities/password/password.module';
import { ProjectModule } from './entities/project/project.module';
import { SkillsModule } from './entities/skills/skills.module';
import { TokensModule } from './entities/tokens/tokens.module';
import { UserDataModule } from './entities/user-data/user-data.module';
import { UsersModule } from './entities/users/users.module';
import { WorkModule } from './entities/work/work.module';
import { GlobalExceptionFilter } from './logger/global-exception-filter';
import { GlobalLoggerService } from './logger/global-logger.service';
import { CorsMiddleware } from './middleware/cors-middleware';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/public',
    }),
    TypeOrmModule,
    AttemptsModule,
    AuthModule,
    UsersModule,
    MailModule,
    GoogleModule,
    PasswordModule,
    TokensModule,
    WorkModule,
    EducationModule,
    ProjectModule,
    AdminModule,
    IconsSvgModule,
    UserDataModule,
    SkillsModule,
    CloudinaryModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    GlobalLoggerService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorsMiddleware).forRoutes('*');
  }
}
