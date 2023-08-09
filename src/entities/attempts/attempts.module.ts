import { Module } from '@nestjs/common';
import { AttemptsService } from './attempts.service';

@Module({
  providers: [AttemptsService],
})
export class AttemptsModule {}
