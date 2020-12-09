"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const gamesController_1 = __importDefault(require("../controllers/gamesController"));
class GamesRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', gamesController_1.default.list);
        this.router.get('/wish', gamesController_1.default.getUserWishList);
        this.router.get('/:id', gamesController_1.default.getOne);
        this.router.post('/', gamesController_1.default.create);
        this.router.put('/addList/:idGame', gamesController_1.default.addtoWL);
        this.router.put('/:id', gamesController_1.default.update);
        this.router.put('/:id/buy', gamesController_1.default.buy);
        this.router.delete('/:id', gamesController_1.default.delete);
        this.router.delete('/wish/:id', gamesController_1.default.deletefromList);
    }
}
const gamesroutes = new GamesRoutes();
exports.default = gamesroutes.router;
