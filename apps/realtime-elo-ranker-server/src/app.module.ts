import { Module } from '@nestjs/common';
import {AppController} from './app.controller';
import { AppService } from './app.service';
import { PlayerService } from './player/player.service';
import { RankingService } from './ranking/ranking.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, PlayerService, RankingService],
})
export class AppModule {}
