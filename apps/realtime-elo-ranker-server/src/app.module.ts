import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {AppController} from './app.controller';
import { AppService } from './app.service';
import { PlayerService } from './player/player.service';
import { MatchService } from './match/match.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, PlayerService, MatchService,],
})
export class AppModule {}
