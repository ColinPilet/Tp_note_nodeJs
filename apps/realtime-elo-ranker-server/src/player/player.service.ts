import { Injectable } from '@nestjs/common';


@Injectable()
export class PlayerService {
    private static instance: PlayerService;
    private players: {id: string, rank: number }[] = [];

    private constructor() {
        this.players.push({ id: 'player1', rank: 1000 });
        this.players.push({ id: 'player2', rank: 1000 });
    }

    static getInstance(): PlayerService {
        if (!PlayerService.instance) {
            PlayerService.instance = new PlayerService();
        }
        return PlayerService.instance;
    }

    addPlayer(nomPlayer: string): void {
        console.log(`Received player name: ${nomPlayer}`);
        this.players.push({id: nomPlayer, rank:1000});
    }

    getPlayer(name: string): { id: string, rank: number } | undefined  {
        return this.players.find(player => player.id === name);

    }

    getAllPlayers(): { id: string, rank: number }[] {
        return this.players;
    }

    updatePlayerRank(id: string, rank: number): void {
        const player = this.getPlayer(id);
        if (player) {
          player.rank = rank;
        }
    }

}