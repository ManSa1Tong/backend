import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { TwitterModule } from './modules/twitter/twitter.module';
import { ConfigModule } from '@nestjs/config';
import { KopisModule } from './modules/kopis/kopis.module';
import { BookModule } from './modules/book/book.module';
import { SteamModule } from './modules/steam/steam.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UserModule,
    TwitterModule,
    KopisModule,
    BookModule,
    SteamModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
