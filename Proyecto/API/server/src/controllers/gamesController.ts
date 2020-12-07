import {Request, Response } from 'express';
import pool from '../database';

class GamesController
{
    public async list (req: Request, res: Response)
    {
        // id, titulo, descripcion, imagen, fecha_creacion
        const games = await pool.query('select id, titulo, descripcion, imagen, precio, fecha_creacion from games where comprado = false');

        res.json(games);
        
    }

    public async create(req: Request, res: Response): Promise<void>
    {
        console.log(req.body);

        await pool.query('insert into games set ?', [req.body])

        res.json({message: 'Juego guardado'});
    }

    public async delete(req: Request, res: Response)
    {

        const { id }  = req.params;

        await pool.query('delete from games where id = ?', [id]);
        res.json({text: 'el juego con id '  + req.params.id + ' fue eliminao'});

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
        await pool.query('update games set comprado = 1 where id = ?', [id]);

        res.json({text: 'juego ' + req.params.id + ' comprado'});

    }
    

    public async getOne (req: Request, res: Response)
    {
        const { id }  = req.params;

        const juego = await pool.query('select id, titulo, descripcion, imagen, precio, fecha_creacion from games where id = ?', [id]);

        if(juego.length > 0)
        {
            return res.json(juego[0]);
        }
        res.status(404).json({text: 'El juego no existe'});
        

        console.log(juego);

        res.json('juego encontrado');

    }

    /*
    public async getUserWishList(req: Request, res: Response)
    {
        //Get User WishList
    }
    */
}

const gamesController = new GamesController();

export default gamesController;