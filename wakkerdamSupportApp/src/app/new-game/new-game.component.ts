import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { DataService } from '../data.service';

import { GameLeader } from '../gameLeader';
import { Game } from '../game';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.scss']
})
export class NewGameComponent implements OnInit {
	gameLeader: GameLeader;
	subTitle: string = "Make new game for gameleader ";

  constructor(
		private route: ActivatedRoute,
		private location: Location,
		private dataService: DataService,
	) { }

  ngOnInit() {
		this.getGameLeader();
  }
	
	getGameLeader(): void {
		const gameLeaderId = +this.route.snapshot.paramMap.get('gameLeaderId');
		this.dataService.getData('gameLeaders').subscribe(gameLeaders => {
		this.gameLeader = gameLeaders.find(x => x.id == gameLeaderId);
		this.subTitle+=this.gameLeader.name});
	}
	
	makeNewGame(gameName: string): void {
		gameName = gameName.trim();
    if (gameName){ 
			let game=new Game(gameName,this.gameLeader.id);
			this.dataService.addData('games',game).subscribe();
			this.location.back();
		}
	}
}
