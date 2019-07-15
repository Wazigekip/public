import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TitleComponent } from './title/title.component';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { BackButtonComponent } from './back-button/back-button.component';
import { LoginComponent } from './login/login.component';
import { PlayerListComponent } from './player-list/player-list.component';
import { GamesOverviewComponent } from './games-overview/games-overview.component';
import { NewPlayerComponent } from './new-player/new-player.component';
import { SubTitleComponent } from './sub-title/sub-title.component';
import { NewGameComponent } from './new-game/new-game.component';
import { GameOverviewComponent } from './game-overview/game-overview.component';

@NgModule({
  declarations: [
    AppComponent,
    TitleComponent,
    MenuBarComponent,
    BackButtonComponent,
    LoginComponent,
    PlayerListComponent,
    GamesOverviewComponent,
    NewPlayerComponent,
    SubTitleComponent,
    NewGameComponent,
    GameOverviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
		HttpClientModule,
		HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
