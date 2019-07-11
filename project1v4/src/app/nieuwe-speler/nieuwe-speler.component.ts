import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Speler } from '../speler';
import { SpelerService } from '../speler.service';

@Component({
  selector: 'app-nieuwe-speler',
  templateUrl: './nieuwe-speler.component.html',
  styleUrls: ['./nieuwe-speler.component.scss']
})
export class NieuweSpelerComponent implements OnInit {

  constructor(
		private route: ActivatedRoute,
		private location: Location,
		private spelerService: SpelerService
	) { }

  ngOnInit() {
  }
	
	nieuweSpelerToevoegen(naam: string, profielnummer: number): void {
    naam = naam.trim();
    if (!naam||!profielnummer) { return; }
    this.spelerService.addSpeler({naam, profielnummer} as Speler).subscribe();
		this.terug();
  }

	terug(): void {
    this.location.back();
  }
}
