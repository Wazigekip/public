import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { DataService } from '../data.service';

import { GameLeader } from '../gameLeader';
import { Game } from '../game';

@Component({
  selector: 'app-games-overview',
  templateUrl: './games-overview.component.html',
  styleUrls: ['./games-overview.component.scss']
})
export class GamesOverviewComponent implements OnInit {
	gameLeader: GameLeader;
	games: Game[];
	subTitle: string = "Games overview of gameleader ";

  constructor(
		private route: ActivatedRoute,
		private dataService: DataService
	) { }

  ngOnInit() {
		this.getGames();
		this.getGameLeader();
  }
	
	getGames(): void {
		const gameLeaderId = +this.route.snapshot.paramMap.get('gameLeaderId');
		this.dataService.getData('games').subscribe(games => 
		this.games = games.filter(x => x.gameLeaderId == gameLeaderId));
	}
	
	getGameLeader(): void {
		const gameLeaderId = +this.route.snapshot.paramMap.get('gameLeaderId');
		this.dataService.getData('gameLeaders').subscribe(gameLeaders => {
		this.gameLeader = gameLeaders.find(x => x.id == gameLeaderId);
		this.subTitle+=this.gameLeader.name});
	}
}
