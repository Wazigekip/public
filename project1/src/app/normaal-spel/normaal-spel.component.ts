import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Spel } from '../spel';
import { SpelService } from '../spel.service';

@Component({
  selector: 'app-normaal-spel',
  templateUrl: './normaal-spel.component.html',
  styleUrls: ['./normaal-spel.component.scss']
})
export class NormaalSpelComponent implements OnInit {
	spel: Spel;

  constructor(
		private route: ActivatedRoute,
		private location: Location,
		private spelService: SpelService
	) { }

  ngOnInit() {
		
		this.getSpel();
  }
	
	getSpel(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.spelService.getSpellen()
		.subscribe(spellen => this.spel = spellen.find(x => x.id == id));
	}
}
