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
  selector: 'app-nieuw-spel',
  templateUrl: './nieuw-spel.component.html',
  styleUrls: ['./nieuw-spel.component.scss']
})
export class NieuwSpelComponent implements OnInit {
	spelleider: Spelleider;
	varianten: Variant[];

  constructor(
		private route: ActivatedRoute,
		private location: Location,
		private spelService: SpelService,
		private spelleiderService: SpelleiderService,
		private variantService: VariantService
	) { }

  ngOnInit() {
		this.getSpelleider();
		this.getVarianten();
  }
	
	getVarianten(): void {
		this.variantService.getVarianten()
		.subscribe(varianten => this.varianten = varianten);
	}

	getSpelleider(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.spelleiderService.getSpelleiders()
		.subscribe(spelleiders => this.spelleider = spelleiders.find(x => x.id == id));
	}
	
	nieuwSpelMaken(naam: string, variant: number): void {
		naam = naam.trim();
    if (!naam) { return; }
		const spelleider = +this.route.snapshot.paramMap.get('id');
		let spel=new Spel(naam,spelleider,variant);
		this.spelService.addSpel(spel as Spel).subscribe();
		this.terug();
	}
	
	terug(): void {
    this.location.back();
  }
}
