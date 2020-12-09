import { Component, HostBinding, OnInit } from '@angular/core';
import { Game } from 'src/app/models/game';
import {GamesService} from '../../services/games.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.css']
})
export class GameFormComponent implements OnInit {

  @HostBinding('class') classes = 'row';

  game: Game = {
    id: 0,
    titulo: "",
    descripcion: "",
    imagen: "",
    precio: "",
    fecha_creacion: new Date()
  };

  edit: boolean = false;

  constructor(private gameService: GamesService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
   const params = this.activatedRoute.snapshot.params;
   if(params.id)
   {
    this.gameService.getGame(params.id)
      .subscribe(
         res =>
         {
          console.log("juego");
          console.log(res);
          this.game = res;
          this.edit = true;
        },
      
       err => console.log(err)
       );
   }
  }

  saveNewGame()
  {
    delete this.game.fecha_creacion;
    delete this.game.id;

    this.gameService.addGame(this.game)
      .subscribe(
        res =>
        {
          console.log(res);
          this.router.navigate(['/games']);
        },
        
        err => console.log(err)
      );
  }

  updateGame()
  {
    delete this.game.fecha_creacion;
    this.gameService.updateGame(this.game.id, this.game)
    .subscribe(
      res =>
      {
        console.log(res);
        this.router.navigate(['/games']);
        
      },
      
      err => console.log(err)
    );
  }

  

}
