import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

import {Game} from '../models/game'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  api_url = 'http://localhost:3040/api';

  constructor(private http: HttpClient) { }

  getGames()
  {
    return this.http.get(`${this.api_url}/games`);
  }

  
  getNotBoughtGames()
  {
    return this.http.get(`${this.api_url}/games/bought`);
  }


  getGame(id: string)
  {
    return this.http.get(`${this.api_url}/games/${id}`)
  }

  
  getUserWishlist()
  {
    return this.http.get(`${this.api_url}/games/wish`);
  }


  addGame(game: Game)
  {
    return this.http.post(`${this.api_url}/games`, game);
  }

  addtoWishL(idGame: string|number|undefined)
  {
    return this.http.put(`${this.api_url}/games/addList/${idGame}`, null)

  }

  deleteGame(id: string)
  {
    return this.http.delete(`${this.api_url}/games/${id}`)
  }

  deleteGamefromList(id: string)
  {
    return this.http.delete(`${this.api_url}/games/wish/${id}`)
  }

  updateGame(id: string|number|undefined, updatedGame: Game) : Observable<Game>
  {
    return this.http.put(`${this.api_url}/games/${id}`, updatedGame)
  }

  buy(id: string)
  {
    return this.http.put(`${this.api_url}/games/${id}/buy`, null);
  }


 

}
