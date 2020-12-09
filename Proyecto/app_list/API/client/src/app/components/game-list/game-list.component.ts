import { Component, HostBinding, OnInit } from '@angular/core';
import {GamesService} from '../../services/games.service'
import { List } from 'src/app/models/list';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {

  @HostBinding('class') classes = 'row';

  games: any = [];

  ListID: List ={
    id: 0
  };
  constructor(private gameService: GamesService) { }

  ngOnInit(): void {
    this.getGames();
  }

  getGames()
  {

    this.gameService.getGames().subscribe(
      res => {
        this.games = res;
       console.log(res);
      },
      err => console.log(err)
    );

  }


  addtoWishList(id: string)
  {
    console.log(id)
    this.gameService.addtoWishL(id).subscribe(
      res => {
        console.log(res);
      },
      err => console.log(err)
    );
  }

  deleteGame(id: string)
  {
    this.gameService.deleteGame(id).subscribe(
      res => {
        console.log(res);
        this.getGames();
      },
      err => console.log(err)
    );
  }

 

}
