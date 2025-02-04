import { Body, Controller, Get, Post, Res, Req } from '@nestjs/common';
import { Response, Request } from 'express';
import { AppService } from './app.service';
import { PlayerService } from './player/player.service';
import { MatchService } from './match/match.service';

@Controller()
export class AppController {
  private playerService: PlayerService;
  private matchService: MatchService;

  constructor(private readonly appService: AppService) {
    this.playerService = PlayerService.getInstance();
    this.matchService = MatchService.getInstance();
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('api/player')
  addPlayer(@Res() res: Response, @Body() body: { id: string}): string {
    const { id } = body;
    if(this.playerService.addPlayer(id)){
      res.status(200).send(id);
      return `Player ${id} added successfully`;
    }
    res.status(400).send(`Player ${id} already exists`);
    return `Player ${id} already exists`;
  }


  @Get('/api/ranking')
  getPlayers(): { id: string, rank: number }[] {
    return this.playerService.getAllPlayers();
  }

  @Get('/api/ranking/events')
  subscribeRankingEvents(@Res() res: Response, @Req() req: Request): void {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('Access-Control-Allow-Origin', '*');

    const sendRankingUpdate = () => {
      const players = this.playerService.getAllPlayers();
      const randomPlayer = players[Math.floor(Math.random() * players.length)];
      const data = {
        type: "RankingUpdate",
        player: randomPlayer
      };
      // this.playerService.updatePlayerRank(randomPlayer.id, randomPlayer.rank + Math.floor(Math.random() * 100) - 50);
      res.write(`event: message\n`);
      res.write(`data: ${JSON.stringify(data)}\n\n`);
    };

    const interval = setInterval(sendRankingUpdate, 500);

    req.on('close', () => {
      clearInterval(interval);
      res.end();
    });
  }

  @Post('/api/match')
  match(@Res() res: Response, @Body() body: { winner: string, loser: string, draw: boolean }): void {
      res.status(200).send('Match');
      this.matchService.match(body.winner, body.loser, body.draw);
  }
}
