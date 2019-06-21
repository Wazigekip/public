import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Spel } from '../spel';
import { SpelService } from '../spel.service';

@Component({
  selector: 'app-spellenoverzicht',
  templateUrl: './spellenoverzicht.component.html',
  styleUrls: ['./spellenoverzicht.component.scss']
})
export class SpellenoverzichtComponent implements OnInit {
	spellen: Spel[];

  constructor(
		private route: ActivatedRoute,
		private location: Location,
		private spelService: SpelService
	) { }

  ngOnInit() {
		this.getSpellen();
  }
	
	getSpellen(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.spelService.getSpellen()
		.subscribe(spellen => this.spellen = spellen.filter(x => x.spelleider == id));
	}
}
