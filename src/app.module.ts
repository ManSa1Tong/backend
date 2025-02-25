import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { TwitterModule } from './modules/twitter/twitter.module';
import { MapleModule } from './modules/maple/maple.module';
import { ConfigModule } from '@nestjs/config';
import { MovieModule } from './modules/movie/movie.module';
import { KopisModule } from './modules/kopis/kopis.module';
import { BookModule } from './modules/book/book.module';

@Module({
  imports: [
    AuthModule,
    TwitterModule,
    MapleModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MovieModule,
    KopisModule,
    BookModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
