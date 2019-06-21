import { Component, OnInit } from '@angular/core';

import { Spelleider } from '../spelleider';
import { SpelleiderService } from '../spelleider.service';

import { Variant } from '../variant';
import { VariantService } from '../variant.service';

@Component({
  selector: 'app-wakkerdam-horror-variant',
  templateUrl: './wakkerdam-horror-variant.component.html',
  styleUrls: ['./wakkerdam-horror-variant.component.scss']
})
export class WakkerdamHorrorVariantComponent implements OnInit {
  spelleiders: Spelleider[];
	varianten: Variant[];
	variant1: Variant;

  constructor(private spelleiderService: SpelleiderService, private variantService: VariantService) { }

  ngOnInit() {
		this.getVarianten();
    this.getSpelleiders();
  }
	
	getVarianten(): void {
		this.variantService.getVarianten()
		.subscribe(varianten => this.varianten = varianten);
		
	}
	
	getVariant(variantnummer: number): void {
		//this.variant1 = this.varianten.find(x => x.id == variantnummer);
		
		this.variantService.getVarianten()
		.subscribe(varianten => this.variant1 = varianten.find(x => x.id == variantnummer));
	}
	


  getSpelleiders(): void {
    this.spelleiderService.getSpelleiders()
    .subscribe(spelleiders => this.spelleiders = spelleiders);
		//this.varianten = new Variant[2];
		for (var _i = 1; _i < 3; _i++) {
			//this.getVariant(_i,this.spelleiders[_i].id);
			//this.getVarianten();
			this.getVariant(2);
		}
  }

}