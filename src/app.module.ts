import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { TwitterService } from './modules/twitter/twitter.service';
import { TwitterController } from './modules/twitter/twitter.controller';
import { TwitterModule } from './modules/twitter/twitter.module';

@Module({
  imports: [AuthModule, TwitterModule],
  controllers: [AppController, TwitterController],
  providers: [AppService, TwitterService],
})
export class AppModule {}
