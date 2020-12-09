"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class GamesController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // id, titulo, descripcion, imagen, fecha_creacion
            const games = yield database_1.default.query('select id, titulo, descripcion, imagen, precio, fecha_creacion from games');
            res.json(games);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            yield database_1.default.query('insert into games set ?', [req.body]);
            res.json({ message: 'Juego guardado' });
        });
    }
    addtoWL(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.params);
            var id_Game = req.params.idGame;
            const idList = yield database_1.default.query('select id_lista from ListID');
            var idLista = idList[0].id_lista;
            const gameExists = yield database_1.default.query('call CheckforGameinWishlist(?, ?)', [idLista, id_Game]);
            var gameExs = gameExists[0];
            console.log(id_Game);
            console.log(idLista);
            console.log(gameExs);
            if (idLista == -1 || id_Game == undefined) {
                console.log("error");
            }
            else {
                if (gameExs.length > 0) {
                    console.log("juego ya en lista");
                }
                else {
                    yield database_1.default.query('insert into list_games (id_list, id_game) values (?, ?)', [idLista, id_Game]);
                }
            }
            res.json({ message: 'Juego guardado en lista' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('delete from games where id = ?', [id]);
            res.json({ text: 'el juego con id ' + req.params.id + ' fue eliminao' });
        });
    }
    deletefromList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('delete from list_games where id_game = ?', [id]);
            res.json({ text: 'el juego con id ' + req.params.id + ' fue eliminao de tu lista' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            console.log("update");
            console.log(req.body);
            yield database_1.default.query('update games set ? where id = ?', [req.body, id]);
            res.json({ text: 'juego ' + req.params.id + ' actualizado' });
        });
    }
    buy(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            console.log("buy");
            yield database_1.default.query('update list_games set comprado = true where id_game = ?', [id]);
            res.json({ text: 'juego ' + req.params.id + ' comprado' });
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const juego = yield database_1.default.query('select id, titulo, descripcion, imagen, precio, fecha_creacion from games where id = ?', [id]);
            console.log("juegoef");
            if (juego.length > 0) {
                return res.json(juego[0]);
            }
            res.status(404).json({ text: 'El juego no existe' });
            console.log(juego);
            res.json('juego encontrado');
        });
    }
    getUserWishList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const idList = yield database_1.default.query('select id_lista from ListID');
            var idLista = idList[0].id_lista;
            const juego = yield database_1.default.query('call getUserWishlist(?)', [idLista]);
            console.log("juegoef");
            if (juego.length > 0) {
                return res.json(juego[0]);
            }
            res.status(404).json({ text: 'La lista no existe' });
            console.log(juego);
            res.json('juego encontrado');
        });
    }
}
const gamesController = new GamesController();
exports.default = gamesController;
