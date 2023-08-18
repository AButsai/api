import { TypeOrmModule } from '@db/typeorm.config';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AttemptsModule } from './entities/attempts/attempts.module';
import { AuthModule } from './entities/auth/auth.module';
import { GoogleModule } from './entities/google/google.module';
import { MailModule } from './entities/mail/mail.module';
import { PasswordModule } from './entities/password/password.module';
import { TokensModule } from './entities/tokens/tokens.module';
import { UsersModule } from './entities/users/users.module';
import { CorsMiddleware } from './middleware/cors-middleware';
import { UploadModule } from './entities/upload/upload.module';
import { WorkModule } from './entities/work/work.module';
import { EducationModule } from './entities/education/education.module';
import { ProjectModule } from './entities/project/project.module';

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
    UploadModule,
    WorkModule,
    EducationModule,
    ProjectModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorsMiddleware).forRoutes('*');
  }
}
