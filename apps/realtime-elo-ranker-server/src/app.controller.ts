import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { PlayerService } from './player/player.service';

@Controller()
export class AppController {
  private playerService: PlayerService;
  constructor(private readonly appService: AppService) {
    this.playerService = PlayerService.getInstance();
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('add-player')
  addPlayer(@Body() name: string): string {
    this.playerService.addPlayer(name);
    return 'Player added successfully';
  }


  @Get('players')
  getPlayers(): { name: string, rank: number }[] {
    return this.playerService.getAllPlayers();
  }
}
