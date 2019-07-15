import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { DataService } from '../data.service';

import { Game } from '../game';

@Component({
  selector: 'app-game-overview',
  templateUrl: './game-overview.component.html',
  styleUrls: ['./game-overview.component.scss']
})
export class GameOverviewComponent implements OnInit {
	game: Game;
	subTitle: string = "Game overview of game ";

  constructor(
		private route: ActivatedRoute,
		private dataService: DataService
	) { }

  ngOnInit() {
		this.getGame();
  }
	
	getGame(): void {
		const gameId = +this.route.snapshot.paramMap.get('gameId');
		this.dataService.getData('games').subscribe(games => {
			this.game = games.find(x => x.id == gameId);
		this.subTitle+=this.game.id});
	}
}
