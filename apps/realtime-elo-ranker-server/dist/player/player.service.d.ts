export declare class PlayerService {
    private static instance;
    private players;
    private constructor();
    static getInstance(): PlayerService;
    addPlayer(nomPlayer: string): void;
    getPlayer(name: string): {
        id: string;
        rank: number;
    } | undefined;
    getAllPlayers(): {
        id: string;
        rank: number;
    }[];
    updatePlayerRank(id: string, rank: number): void;
}
