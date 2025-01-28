import { Response, Request } from 'express';
import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    private playerService;
    constructor(appService: AppService);
    getHello(): string;
    addPlayer(res: Response, body: {
        id: string;
    }): string;
    getPlayers(): {
        id: string;
        rank: number;
    }[];
    subscribeRankingEvents(res: Response, req: Request): void;
}
