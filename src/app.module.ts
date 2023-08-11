import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AttemptsModule } from './entities/attempts/attempts.module';
import { AuthModule } from './entities/auth/auth.module';
import { GoogleModule } from './entities/google/google.module';
import { MailModule } from './entities/mail/mail.module';
import { UploadModule } from './entities/upload/upload.module';
import { UsersModule } from './entities/users/users.module';
import { CorsMiddleware } from './middleware/cors-middleware';
import { FirebaseModule } from './entities/firebase/firebase.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/public',
    }),
    AttemptsModule,
    AuthModule,
    UsersModule,
    UploadModule,
    MailModule,
    GoogleModule,
    FirebaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorsMiddleware).forRoutes('*');
  }
}
