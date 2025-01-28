import { Injectable } from '@nestjs/common';


@Injectable()
export class PlayerService {
    private static instance: PlayerService;
    private players: {id: string, rank: number }[] = [];

    private constructor() {
        this.players.push({ id: 'player1', rank: 1000 });
        this.players.push({ id: 'player2', rank: 2000 });
    }

    static getInstance(): PlayerService {
        if (!PlayerService.instance) {
            PlayerService.instance = new PlayerService();
        }
        return PlayerService.instance;
    }

    addPlayer(nomPlayer: string): boolean {
        if(!this.getPlayer(nomPlayer)){
            console.log(`Player ${nomPlayer} add successfully`);
            this.players.push({id: nomPlayer, rank:this.getAverageRank()});
            return true;
        }
        return false;
    }

    getPlayer(name: string): { id: string, rank: number } | undefined  {
        return this.players.find(player => player.id === name);

    }

    getAllPlayers(): { id: string, rank: number }[] {
        return this.players;
    }

    updatePlayerRank(name: string, rank: number): void {
        const player = this.getPlayer(name);
        if (player) {
          player.rank = rank;
        }
    }

    getAverageRank(): number {
        const totalRank = this.players.reduce((sum, player) => sum + player.rank, 0);
        return this.players.length ? Math.floor(totalRank / this.players.length) : 0;
    }

}