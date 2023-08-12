import { TypeOrmModule } from '@db/typeorm.config';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AttemptsModule } from './entities/attempts/attempts.module';
import { AuthModule } from './entities/auth/auth.module';
import { FirebaseModule } from './entities/firebase/firebase.module';
import { GoogleModule } from './entities/google/google.module';
import { MailModule } from './entities/mail/mail.module';
import { PasswordModule } from './entities/password/password.module';
import { TokensModule } from './entities/tokens/tokens.module';
import { UploadModule } from './entities/upload/upload.module';
import { UsersModule } from './entities/users/users.module';
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
    UploadModule,
    MailModule,
    GoogleModule,
    FirebaseModule,
    PasswordModule,
    TokensModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorsMiddleware).forRoutes('*');
  }
}
