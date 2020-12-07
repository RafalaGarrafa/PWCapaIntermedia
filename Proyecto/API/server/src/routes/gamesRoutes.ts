import { Router } from 'express';
import  gamesController  from '../controllers/gamesController';


class GamesRoutes
{
    public router: Router = Router();
    constructor()
    {
        this.config();
    }

    config(): void
    {
        this.router.get('/', gamesController.list);
        this.router.get('/:id', gamesController.getOne);
        this.router.post('/', gamesController.create);
        this.router.put('/:id', gamesController.update);
        this.router.put('/:id', gamesController.buy);
        this.router.delete('/:id', gamesController.delete);

        //this.router.get('/:id', gamesController.getUserWishlist);
        

    }
}

const gamesroutes = new GamesRoutes();
export default gamesroutes.router;