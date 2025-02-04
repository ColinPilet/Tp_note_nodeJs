import { Module } from '@nestjs/common';
import {AppController} from './app.controller';
import { AppService } from './app.service';
import { PlayerService } from './player/player.service';
import { MatchService } from './match/match.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, PlayerService, MatchService,],
})
export class AppModule {}
