import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ActivePlansController } from './ActivePlans/ActivePlansController';
import { ActivePlansService } from './ActivePlans/ActivePlansService';

@Module({
  imports: [],
  controllers: [AppController, ActivePlansController],
  providers: [
    AppService,
    ActivePlansService,
  ],
})
export class AppModule {}
