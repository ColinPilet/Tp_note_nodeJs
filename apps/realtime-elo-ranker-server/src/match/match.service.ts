import { Injectable } from '@nestjs/common';
import e from 'express';
import { PlayerService } from 'src/player/player.service';

@Injectable()
export class MatchService {
    private static instance: MatchService;
    private playerService: PlayerService;
    private coef = 32;
    
    public constructor() {
        this.playerService = PlayerService.getInstance();
    }

    static getInstance(): MatchService {
        if (!MatchService.instance) {
            MatchService.instance = new MatchService();
        }
        return MatchService.instance;
    }

    calculateWinProbability(rankA: number, rankB: number): number {
        return 1 / (1 + Math.pow(10, (rankB - rankA) / 400));
    }

    eloRating(odlRank: number, result: number, probability: number): number {
        return Math.round(odlRank + this.coef * (result - probability));
    }

    match(winer: string, loser: string, draw: boolean): void {
        const rankP1 = this.playerService.getRank(winer);
        const rankP2 = this.playerService.getRank(loser);

        const expectedScoreP1 = this.calculateWinProbability(rankP1, rankP2);
        const expectedScoreP2 = this.calculateWinProbability(rankP2, rankP1);

        let newRankP1: number, newRankP2: number;
        if (draw) {
            newRankP1 = this.eloRating(rankP1, 0.5, expectedScoreP1);
            newRankP2 = this.eloRating(rankP2, 0.5, expectedScoreP2);
        }else {
            newRankP1 = this.eloRating(rankP1, 1, expectedScoreP1);
            newRankP2 = this.eloRating(rankP2, 0, expectedScoreP2);
        }
        this.playerService.updatePlayerRank(winer, newRankP1);
        this.playerService.updatePlayerRank(loser, newRankP2);
    }
}
