import { PlayerService, Player } from '../services/player.service';
interface CreatePlayerDto {
    name: string;
    elo: number;
}
interface UpdatePlayerDto {
    name?: string;
    elo?: number;
}
export declare class PlayerController {
    private readonly playerService;
    constructor(playerService: PlayerService);
    create(createPlayerDto: CreatePlayerDto): Player;
    findAll(): Player[];
    findOne(id: number): Player;
    update(id: number, updatePlayerDto: UpdatePlayerDto): Player;
    remove(id: number): boolean;
}
export {};
