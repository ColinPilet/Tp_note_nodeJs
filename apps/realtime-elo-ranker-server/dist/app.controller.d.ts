import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    private playerService;
    constructor(appService: AppService);
    getHello(): string;
    addPlayer(name: string): string;
    getPlayers(): {
        name: string;
        rank: number;
    }[];
}
