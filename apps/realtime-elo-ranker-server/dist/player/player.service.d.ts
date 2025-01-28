export declare class PlayerService {
    private static instance;
    private players;
    private constructor();
    static getInstance(): PlayerService;
    addPlayer(nomPlayer: string): boolean;
    getPlayer(name: string): {
        id: string;
        rank: number;
    } | undefined;
    getAllPlayers(): {
        id: string;
        rank: number;
    }[];
    updatePlayerRank(name: string, rank: number): void;
    getAverageRank(): number;
}
