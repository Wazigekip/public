import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Speler } from '../speler';
import { SpelerService } from '../speler.service';

@Component({
  selector: 'app-spelerslijst',
  templateUrl: './spelerslijst.component.html',
  styleUrls: ['./spelerslijst.component.scss']
})
export class SpelerslijstComponent implements OnInit {
	spelers: Speler[];

  constructor(
		private route: ActivatedRoute,
		private location: Location,
		private spelerService: SpelerService
	) { }

  ngOnInit() {
		this.getSpelers();
  }
	
	getSpelers(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.spelerService.getSpelers()
		.subscribe(spelers => this.spelers = spelers);
	}

	addSpeler(naam: string): void {
    naam = naam.trim();
		let spel = 16;
		let mySpeler = new Speler(spel, naam);
		
    if (!naam) { return; }
    this.spelerService.addSpeler({naam} as Speler)
      .subscribe(speler => {
        this.spelers.push(speler);
      });
  }
	
}
