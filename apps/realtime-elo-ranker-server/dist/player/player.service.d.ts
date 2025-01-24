export declare class PlayerService {
    private static instance;
    private players;
    private constructor();
    static getInstance(): PlayerService;
    addPlayer(nomPlayer: string): void;
    getPlayer(name: string): {
        name: string;
        rank: number;
    } | undefined;
    getAllPlayers(): {
        name: string;
        rank: number;
    }[];
    updatePlayerRank(name: string, rank: number): void;
}
