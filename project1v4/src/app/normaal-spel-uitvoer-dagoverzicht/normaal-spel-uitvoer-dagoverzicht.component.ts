import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Berichtgebeurtenis } from '../berichtgebeurtenis';
import { BerichtgebeurtenisService } from '../berichtgebeurtenis.service';

@Component({
  selector: 'app-normaal-spel-uitvoer-dagoverzicht',
  templateUrl: './normaal-spel-uitvoer-dagoverzicht.component.html',
  styleUrls: ['./normaal-spel-uitvoer-dagoverzicht.component.scss']
})
export class NormaalSpelUitvoerDagoverzichtComponent implements OnInit {
	berichtgebeurtenissen: Berichtgebeurtenis[];
	dag: number;
	aantalBerichten: number;
	id: number;
	
  constructor(
		private route: ActivatedRoute,
		private location: Location,
		private berichtgebeurtenisService: BerichtgebeurtenisService
	) { }
	
	ngOnInit() {
		this.getBerichtgebeurtenissen();
		this.getDag();
		this.getId();
  }
	
	getBerichtgebeurtenissen(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		const dag = +this.route.snapshot.paramMap.get('dag');
		this.berichtgebeurtenisService.getBerichtgebeurtenissen()
		.subscribe(berichtgebeurtenissen => this.aantalBerichten = berichtgebeurtenissen.filter(x => x.spel == id && x.dag == dag).length);
	}
	
	getDag(): void {
		this.dag = +this.route.snapshot.paramMap.get('dag');
	}
	
	getId(): void {
		this.id = +this.route.snapshot.paramMap.get('id');
	}
	
	getRouterlinkspeltopic(): string {
		const dag = +this.route.snapshot.paramMap.get('dag');
		const id = +this.route.snapshot.paramMap.get('id');
		return '/normaaluitvoer/'+id+'/'+dag;
	}
	
	getRouterlinkrolberichten(): string {
		const dag = +this.route.snapshot.paramMap.get('dag');
		const id = +this.route.snapshot.paramMap.get('id');
		return '/rolberichtenuitvoer/'+id+'/'+dag+'/'+this.berichtgebeurtenissen.length;
	}
	
	getRouterlinkDodentopic(): string {
		const dag = +this.route.snapshot.paramMap.get('dag');
		const id = +this.route.snapshot.paramMap.get('id');
		return '/dodentopicuitvoer/'+id+'/'+dag;
	}

  

	terug(): void {
    this.location.back();
  }
}
