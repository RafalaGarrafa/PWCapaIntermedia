import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {GameListComponent} from './components/game-list/game-list.component'
import {GameFormComponent} from './components/game-form/game-form.component'
import {WishListComponent} from './components/wish-list/wish-list.component'

const routes: Routes = [
  {
    path: '',
    redirectTo: '/games',
    pathMatch: 'full'
  }, 
  {
    path: 'lists',
    redirectTo: 'localhost:3001'
  },
  {
    path: 'games',
    component: GameListComponent
  },
  {
    path: 'games/add',
    component: GameFormComponent
  },
  {
    path: 'games/edit/:id',
    component: GameFormComponent
  },
  {
    path: 'games/buy/:id',
    component: WishListComponent
  },
  {
    path: 'games/wish',
    component: WishListComponent
  },
  {
    path: 'games/addList/:idGame',
    component: GameListComponent
  }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
