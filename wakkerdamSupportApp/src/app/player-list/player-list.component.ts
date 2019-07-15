import { Component, OnInit } from '@angular/core';

import { DataService } from '../data.service';

import { Player } from '../player';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss']
})
export class PlayerListComponent implements OnInit {
	players: Player[];
	subTitle: string = "Playerlist";
	
  constructor(
		private dataService: DataService
	) { }

  ngOnInit() {
		this.getPlayers();
  }

	getPlayers(): void {
		this.dataService.getData('players').subscribe(players => 
		this.players = players);
	}
	
	deletePlayer(playerId: number): void {
		this.players.splice(this.players.findIndex(x => x.id==playerId),1);
		this.dataService.deleteData('players',playerId).subscribe();
	}
}
