import { Component, OnInit } from '@angular/core';

import { Location } from '@angular/common';

import { DataService } from '../data.service';

import { Player } from '../player';

@Component({
  selector: 'app-new-player',
  templateUrl: './new-player.component.html',
  styleUrls: ['./new-player.component.scss']
})
export class NewPlayerComponent implements OnInit {
	subTitle: string = "Add new player";

  constructor(
		private location: Location,
		private dataService: DataService
	) { }

  ngOnInit() {
  }

	addNewPlayer(name: string, profileNumber: number): void {
    name = name.trim();
    if (name&&profileNumber){
			let player=new Player(name, profileNumber);
			this.dataService.addData('players',player).subscribe();
			this.location.back();
		}
  }
}
