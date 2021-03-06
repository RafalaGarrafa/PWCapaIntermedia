import { Component, HostBinding, OnInit } from '@angular/core';
import {GamesService} from '../../services/games.service'
import { Game } from 'src/app/models/game';
import { List } from 'src/app/models/list';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent implements OnInit {

  @HostBinding('class') classes = 'row';

  games: any = [];

  game: Game = {
    id: 0,
    titulo: "",
    descripcion: "",
    imagen: "",
    precio: "",
    fecha_creacion: new Date()
  };

  ListID: List ={
    id: 0
  };

  constructor(private gameService: GamesService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getGames();
  }


  getGames()
  {
    this.gameService.getUserWishlist().subscribe(
      res => {
        this.games = res;
      },
      err => console.log(err)
    );
  }

  deleteGame(id: string)
  {
    this.gameService.deleteGamefromList(id).subscribe(
      res => {
        console.log(res);
        this.getGames();
      },
      err => console.log(err)
    );
  
  }

  buyGame(id: string)
  {
    console.log(id);
    this.gameService.buy(id)
    .subscribe(
      res =>
      {
        console.log(res);
        this.getGames();
        
      },
      
      err => console.log(err)
    );
    
  }
 


}
