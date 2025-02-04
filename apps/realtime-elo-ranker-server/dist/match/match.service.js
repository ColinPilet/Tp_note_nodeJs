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
var MatchService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchService = void 0;
const common_1 = require("@nestjs/common");
const player_service_1 = require("../player/player.service");
let MatchService = MatchService_1 = class MatchService {
    constructor() {
        this.coef = 32;
        this.playerService = player_service_1.PlayerService.getInstance();
    }
    static getInstance() {
        if (!MatchService_1.instance) {
            MatchService_1.instance = new MatchService_1();
        }
        return MatchService_1.instance;
    }
    calculateWinProbability(rankA, rankB) {
        return 1 / (1 + Math.pow(10, (rankB - rankA) / 400));
    }
    eloRating(odlRank, result, probability) {
        return Math.round(odlRank + this.coef * (result - probability));
    }
    match(winer, loser, draw) {
        const rankP1 = this.playerService.getRank(winer);
        const rankP2 = this.playerService.getRank(loser);
        const expectedScoreP1 = this.calculateWinProbability(rankP1, rankP2);
        const expectedScoreP2 = this.calculateWinProbability(rankP2, rankP1);
        let newRankP1, newRankP2;
        if (draw) {
            newRankP1 = this.eloRating(rankP1, 0.5, expectedScoreP1);
            newRankP2 = this.eloRating(rankP2, 0.5, expectedScoreP2);
        }
        else {
            newRankP1 = this.eloRating(rankP1, 1, expectedScoreP1);
            newRankP2 = this.eloRating(rankP2, 0, expectedScoreP2);
        }
        this.playerService.updatePlayerRank(winer, newRankP1);
        this.playerService.updatePlayerRank(loser, newRankP2);
    }
};
exports.MatchService = MatchService;
exports.MatchService = MatchService = MatchService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], MatchService);
//# sourceMappingURL=match.service.js.map