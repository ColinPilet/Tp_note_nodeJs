"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const player_service_1 = require("./player/player.service");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
        this.playerService = player_service_1.PlayerService.getInstance();
    }
    getHello() {
        return this.appService.getHello();
    }
    addPlayer(res, body) {
        const { id } = body;
        if (this.playerService.addPlayer(id)) {
            res.status(200).send(id);
            return `Player ${id} added successfully`;
        }
        res.status(400).send(`Player ${id} already exists`);
        return `Player ${id} already exists`;
    }
    getPlayers() {
        return this.playerService.getAllPlayers();
    }
    subscribeRankingEvents(res, req) {
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        res.setHeader('Access-Control-Allow-Origin', '*');
        const sendRankingUpdate = () => {
            const players = this.playerService.getAllPlayers();
            const randomPlayer = players[Math.floor(Math.random() * players.length)];
            const data = {
                type: "RankingUpdate",
                player: randomPlayer
            };
            this.playerService.updatePlayerRank(randomPlayer.id, randomPlayer.rank + Math.floor(Math.random() * 100) - 50);
            res.write(`event: message\n`);
            res.write(`data: ${JSON.stringify(data)}\n\n`);
        };
        const interval = setInterval(sendRankingUpdate, 500);
        req.on('close', () => {
            clearInterval(interval);
            res.end();
        });
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
__decorate([
    (0, common_1.Post)('api/player'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", String)
], AppController.prototype, "addPlayer", null);
__decorate([
    (0, common_1.Get)('/api/ranking'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Array)
], AppController.prototype, "getPlayers", null);
__decorate([
    (0, common_1.Get)('/api/ranking/events'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "subscribeRankingEvents", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
//# sourceMappingURL=app.controller.js.map