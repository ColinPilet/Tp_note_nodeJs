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
var PlayerService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerService = void 0;
const common_1 = require("@nestjs/common");
let PlayerService = PlayerService_1 = class PlayerService {
    constructor() {
        this.players = [];
        this.players.push({ id: 'player1', rank: 1000 });
        this.players.push({ id: 'player2', rank: 1000 });
    }
    static getInstance() {
        if (!PlayerService_1.instance) {
            PlayerService_1.instance = new PlayerService_1();
        }
        return PlayerService_1.instance;
    }
    addPlayer(nomPlayer) {
        console.log(`Received player name: ${nomPlayer}`);
        this.players.push({ id: nomPlayer, rank: 1000 });
    }
    getPlayer(name) {
        return this.players.find(player => player.id === name);
    }
    getAllPlayers() {
        return this.players;
    }
    updatePlayerRank(id, rank) {
        const player = this.getPlayer(id);
        if (player) {
            player.rank = rank;
        }
    }
};
exports.PlayerService = PlayerService;
exports.PlayerService = PlayerService = PlayerService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], PlayerService);
//# sourceMappingURL=player.service.js.map