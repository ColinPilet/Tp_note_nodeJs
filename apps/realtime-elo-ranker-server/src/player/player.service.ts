import { Injectable } from '@nestjs/common';


@Injectable()
export class PlayerService {
    private static instance: PlayerService;
    private players: Map<string, number> = new Map();

    private constructor() {
        this.players.set('player1', 1000);
        this.players.set('player2', 1000);
    }

    static getInstance(): PlayerService {
        if (!PlayerService.instance) {
            PlayerService.instance = new PlayerService();
        }
        return PlayerService.instance;
    }

    addPlayer(nomPlayer: string): void {
        this.players.set(nomPlayer, 1000);
    }

    getPlayer(name: string): { name: string, rank: number } | undefined {
        const rank = this.players.get(name);
        if (rank !== undefined) {
            return { name, rank };
        }
        return undefined;
    }

    getAllPlayers(): { name: string, rank: number }[] {
        return Array.from(this.players, ([name, rank]) => ({ name, rank }));
    }

    updatePlayerRank(name: string, rank: number): void {
        this.players.set(name, rank);
    }
}