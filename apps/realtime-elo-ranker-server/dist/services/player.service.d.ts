export interface Player {
    id: number;
    name: string;
    elo: number;
}
export declare class PlayerService {
    private players;
    private idCounter;
    create(player: Omit<Player, 'id'>): Player;
    findAll(): Player[];
    findOne(id: number): Player | undefined;
    update(id: number, player: Partial<Omit<Player, 'id'>>): Player | undefined;
    remove(id: number): boolean;
}
