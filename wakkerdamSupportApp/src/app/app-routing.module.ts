import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { PlayerListComponent } from './player-list/player-list.component';
import { GamesOverviewComponent } from './games-overview/games-overview.component';
import { NewPlayerComponent } from './new-player/new-player.component';
import { NewGameComponent } from './new-game/new-game.component';
import { GameOverviewComponent } from './game-overview/game-overview.component';

const routes: Routes = [
	{ path: '', redirectTo: '/login', pathMatch: 'full' },
	{ path: 'login', component: LoginComponent },
	{ path: 'playerlist', component: PlayerListComponent },
	{ path: 'newplayer', component: NewPlayerComponent },
	{ path: 'gamesoverview/:gameLeaderId', component: GamesOverviewComponent },
	{ path: 'newgame/:gameLeaderId', component: NewGameComponent },
	{ path: 'game/:gameId', component: GameOverviewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
