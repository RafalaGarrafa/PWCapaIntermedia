import {Request, Response } from 'express';
import pool from '../database';

class GamesController
{
    public async list (req: Request, res: Response)
    {
        // id, titulo, descripcion, imagen, fecha_creacion
        const games = await pool.query('select id, titulo, descripcion, imagen, precio, fecha_creacion from games');

        res.json(games);
        
    }

    public async create(req: Request, res: Response): Promise<void>
    {
        console.log(req.body);

        await pool.query('insert into games set ?', [req.body])

        res.json({message: 'Juego guardado'});
    }

    public async addtoWL(req: Request, res: Response): Promise<void>
    {
        console.log(req.params);
        var id_Game = req.params.idGame;

        const idList = await pool.query('select id_lista from ListID');
        var idLista = idList[0].id_lista;

        const gameExists = await pool.query('call CheckforGameinWishlist(?, ?)', [idLista, id_Game]);
        var gameExs = gameExists[0];

        console.log(id_Game);
        console.log(idLista);
        console.log(gameExs);

        if(idLista == -1 || id_Game == undefined)
        {
             console.log("error");
        }
        else
        {
            if(gameExs.length > 0)
            {
                console.log("juego ya en lista")
            }
            else
            {
                await pool.query('insert into list_games (id_list, id_game) values (?, ?)', [idLista, id_Game])
            }
        }        

        res.json({message: 'Juego guardado en lista'});
    }

    public async delete(req: Request, res: Response)
    {

        const { id }  = req.params;

        await pool.query('delete from games where id = ?', [id]);
        res.json({text: 'el juego con id '  + req.params.id + ' fue eliminao'});

    }

    public async deletefromList(req: Request, res: Response)
    {

        const { id }  = req.params;

        await pool.query('delete from list_games where id_game = ?', [id]);
        res.json({text: 'el juego con id '  + req.params.id + ' fue eliminao de tu lista'});

    }

    public async update(req: Request, res: Response)
    {
        const { id }  = req.params;
        console.log("update");
        console.log(req.body);
       
    
        await pool.query('update games set ? where id = ?', [req.body, id]);
        

        res.json({text: 'juego ' + req.params.id + ' actualizado'});

    }
    
    public async buy(req: Request, res: Response)
    {
        const { id }  = req.params;
        console.log("buy");
        await pool.query('update list_games set comprado = true where id_game = ?', [id]);

        res.json({text: 'juego ' + req.params.id + ' comprado'});

    }
    

    public async getOne (req: Request, res: Response)
    {
        const { id }  = req.params;

        const juego = await pool.query('select id, titulo, descripcion, imagen, precio, fecha_creacion from games where id = ?', [id]);
        console.log("juegoef");

        if(juego.length > 0)
        {
            return res.json(juego[0]);
        }
        res.status(404).json({text: 'El juego no existe'});
        

        console.log(juego);

        res.json('juego encontrado');

    }
    
    public async getUserWishList(req: Request, res: Response)
    {

        const idList = await pool.query('select id_lista from ListID');
        var idLista = idList[0].id_lista;
        const juego = await pool.query('call getUserWishlist(?)', [idLista]);
        console.log("juegoef");

        if(juego.length > 0)
        {
            return res.json(juego[0]);
        }
        res.status(404).json({text: 'La lista no existe'});
        

        console.log(juego);

        res.json('juego encontrado');
    }
    
}

const gamesController = new GamesController();

export default gamesController;