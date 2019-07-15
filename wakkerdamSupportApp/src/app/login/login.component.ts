import { Component, OnInit } from '@angular/core';

import { DataService } from '../data.service';

import { GameLeader } from '../gameleader';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	gameLeaderId: number;
	gameLeaders: GameLeader[];
	subTitle: string = "Login gameleader";
	
  constructor(
		private dataService: DataService
	) { }

  ngOnInit() {
		this.getGameLeaders();
  }
	
	getGameLeaders(): void {
		this.dataService.getData('gameLeaders').subscribe(gameLeaders => {
		this.gameLeaders = gameLeaders;
		this.gameLeaderId = this.gameLeaders[0].id});
	}

	changeGameLeader(gameLeaderId: number): void {
		this.gameLeaderId = gameLeaderId;
	}
}
