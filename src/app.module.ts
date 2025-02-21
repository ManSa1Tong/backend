import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { TwitterModule } from './modules/twitter/twitter.module';
import { MapleModule } from './modules/maple/maple.module';
import { ConfigModule } from '@nestjs/config';
import { KopisModule } from './modules/kopis/kopis.module';

@Module({
  imports: [
    AuthModule,
    TwitterModule,
    MapleModule,
    ConfigModule.forRoot({ isGlobal: true }),
    KopisModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
