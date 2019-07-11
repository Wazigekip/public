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

	addSpeler(naam: string, profielnummer: number): void {
    naam = naam.trim();
    if (!naam||!profielnummer) { return; }
    this.spelerService.addSpeler({naam, profielnummer} as Speler)
      .subscribe(speler => {
        this.spelers.push(speler);
      });
  }
	
	deleteSpeler(speler: Speler): void {
		this.spelers = this.spelers.filter(h => h != speler);
    this.spelerService.deleteSpeler(speler).subscribe();
  }
	
	terug(): void {
    this.location.back();
  }
}
