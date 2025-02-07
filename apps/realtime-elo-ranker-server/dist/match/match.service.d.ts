export declare class MatchService {
    private static instance;
    private playerService;
    private coef;
    constructor();
    static getInstance(): MatchService;
    calculateWinProbability(rankA: number, rankB: number): number;
    eloRating(odlRank: number, result: number, probability: number): number;
    match(winer: string, loser: string, draw: boolean): void;
}
