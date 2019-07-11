import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Spel } from '../spel';
import { SpelService } from '../spel.service';

import { Spelleider } from '../spelleider';
import { SpelleiderService } from '../spelleider.service';

import { Variant } from '../variant';
import { VariantService } from '../variant.service';

@Component({
  selector: 'app-spellenoverzicht',
  templateUrl: './spellenoverzicht.component.html',
  styleUrls: ['./spellenoverzicht.component.scss']
})
export class SpellenoverzichtComponent implements OnInit {
	spellen: Spel[];
	varianten: Variant[];
	spelleider: Spelleider;
	

  constructor(
		private route: ActivatedRoute,
		private location: Location,
		private spelService: SpelService,
		private spelleiderService: SpelleiderService,
		private variantService: VariantService
	) { }

  ngOnInit() {
		this.getSpellen();
		this.getVarianten();
		this.getSpelleider();
  }
	
	getSpelleider(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.spelleiderService.getSpelleiders()
		.subscribe(spelleiders => this.spelleider = spelleiders.find(x => x.id == id));
	}
	
	getVarianten(): void {
		this.variantService.getVarianten()
		.subscribe(varianten => this.varianten = varianten);
	}
	
	getSpellen(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.spelService.getSpellen()
		.subscribe(spellen => this.spellen = spellen.filter(x => x.spelleider == id));
	}
	
	nieuwSpel(naam: string, variant: number): void {
		const spelleider = +this.route.snapshot.paramMap.get('id');
		let dag = 0;
		let burgemeester = "";
		
		this.spelService.addSpel({naam, spelleider, variant, dag, burgemeester} as Spel)
			.subscribe(spel => {
        this.spellen.push(spel);
      });
	}
	
	terug(): void {
    this.location.back();
  }
}
