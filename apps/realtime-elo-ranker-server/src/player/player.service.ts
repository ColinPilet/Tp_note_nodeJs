import { Injectable } from '@nestjs/common';


@Injectable()
export class PlayerService {
    private static instance: PlayerService;
    private playersRanking: {id: string, rank: number }[] = [];

    public constructor() {
        this.playersRanking.push({ id: 'player1', rank: 1000 });
        this.playersRanking.push({ id: 'player2', rank: 2000 });
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
            this.playersRanking.push({id: nomPlayer, rank:this.getAverageRank()});
            return true;
        }
        return false;
    }

    getPlayer(name: string): { id: string, rank: number } | undefined  {
        return this.playersRanking.find(player => player.id === name);

    }

    getRank(name: string): number {
        const player = this.getPlayer(name);
        return player ? player.rank : 0;
    }

    getAllPlayers(): { id: string, rank: number }[] {
        return this.playersRanking;
    }

    updatePlayerRank(name: string, rank: number): void {
        const player = this.getPlayer(name);
        if (player) {
          player.rank = rank;
        }
    }

    getAverageRank(): number {
        const totalRank = this.playersRanking.reduce((sum, player) => sum + player.rank, 0);
        return this.playersRanking.length ? Math.floor(totalRank / this.playersRanking.length) : 0;
    }
}