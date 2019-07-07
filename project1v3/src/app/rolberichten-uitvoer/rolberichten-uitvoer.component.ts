import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Spel } from '../spel';
import { SpelService } from '../spel.service';

import { Spelspeler } from '../spelspeler';
import { SpelspelerService } from '../spelspeler.service';

import { Berichtgebeurtenis } from '../berichtgebeurtenis';
import { BerichtgebeurtenisService } from '../berichtgebeurtenis.service';

@Component({
  selector: 'app-rolberichten-uitvoer',
  templateUrl: './rolberichten-uitvoer.component.html',
  styleUrls: ['./rolberichten-uitvoer.component.scss']
})
export class RolberichtenUitvoerComponent implements OnInit {
	spelspelers: Spelspeler[];
	spel: Spel;
	berichtgebeurtenissen: Berichtgebeurtenis[];

  constructor(
		private route: ActivatedRoute,
		private location: Location,
		private spelspelerService: SpelspelerService,
		private spelService: SpelService,
		private berichtgebeurtenisService: BerichtgebeurtenisService
	) { }

  ngOnInit() {
		this.getSpel();
		this.getSpelspelers();
		this.getBerichtgebeurtenissen();
  }
	
	getBerichtgebeurtenissen(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		const dag = +this.route.snapshot.paramMap.get('dag');
		this.berichtgebeurtenisService.getBerichtgebeurtenissen()
		.subscribe(berichtgebeurtenissen => this.berichtgebeurtenissen = berichtgebeurtenissen.filter(x => x.spel == id && x.dag == dag));
	}
	
	getSpelspelers(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.spelspelerService.getSpelspelers()
		.subscribe(spelspelers => this.spelspelers = spelspelers.filter(x => x.spel == id));
	}
	
	getSpel(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.spelService.getSpellen()
		.subscribe(spellen => this.spel = spellen.find(x => x.id == id));
	}
	
	copyInputMessage(containerid,index){
    var range = document.createRange();
    range.selectNode(document.getElementById(containerid));
    window.getSelection().removeAllRanges();
		window.getSelection().addRange(range);
    document.execCommand("copy");
    
  
  }
	
	terug(): void {
    this.location.back();
  }
}
