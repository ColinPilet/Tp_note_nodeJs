import { Module } from '@nestjs/common';
import {AppController} from './app.controller';
import { PlayerService } from './player/player.service';
import { RankingService } from './ranking/ranking.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [PlayerService, RankingService],
})
export class AppModule {}
