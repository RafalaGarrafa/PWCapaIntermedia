import {Request } from 'express';
import {Response } from 'express';

class IndexController
{
    public index (req: Request, res: Response)
    {
        res.json({text: 'API Is /api/games'});
    }
}

export const indexController = new IndexController();