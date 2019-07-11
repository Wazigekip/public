import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Spel } from '../spel';
import { SpelService } from '../spel.service';

import { Spelspeler } from '../spelspeler';
import { SpelspelerService } from '../spelspeler.service';

@Component({
  selector: 'app-normaal-spel',
  templateUrl: './normaal-spel.component.html',
  styleUrls: ['./normaal-spel.component.scss']
})
export class NormaalSpelComponent implements OnInit {
	spel: Spel;
	spelspelers: Spelspeler[];
	aantalspelers: number;

  constructor(
		private route: ActivatedRoute,
		private location: Location,
		private spelService: SpelService,
		private spelspelerService: SpelspelerService
	) { }

  ngOnInit() {
		this.getSpel();
		this.getAantalspelers();
  }
	
	getSpel(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.spelService.getSpellen()
		.subscribe(spellen => this.spel = spellen.find(x => x.id == id));
	}
	
	getAantalspelers(): void {
		this.spelspelerService.getSpelspelers()
		.subscribe(spelspelers => this.aantalspelers = spelspelers.filter(x => x.spel == this.spel.id&&x.dood=='').length);
	}
	
	terug(): void {
    this.location.back();
  }
}
