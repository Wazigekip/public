import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Spel } from '../spel';
import { SpelService } from '../spel.service';

import { Speler } from '../speler';
import { SpelerService } from '../speler.service';

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
	spelers: Speler[];
	spel: Spel;
	dag: number;
	berichtgebeurtenissen: Berichtgebeurtenis[];

  constructor(
		private route: ActivatedRoute,
		private location: Location,
		private spelspelerService: SpelspelerService,
		private spelerService: SpelerService,
		private spelService: SpelService,
		private berichtgebeurtenisService: BerichtgebeurtenisService
	) { }

  ngOnInit() {
		this.getSpel();
		this.getBerichtgebeurtenissen();
		this.getSpelspelers();
		this.getSpelers();
		this.getDag();
  }
	
	getDag(): void {
		this.dag = +this.route.snapshot.paramMap.get('dag');
	}
	
	getBerichtgebeurtenissen(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		const dag = +this.route.snapshot.paramMap.get('dag');
		this.berichtgebeurtenisService.getBerichtgebeurtenissen()
		.subscribe(berichtgebeurtenissen => this.berichtgebeurtenissen = berichtgebeurtenissen.filter(x => x.spel == id && x.dag == dag));
	}
	
	getSpelers(): void {
		this.spelers=[];
		const aantal = +this.route.snapshot.paramMap.get('aantal');
		for(let i=0;i<aantal;i++){
			this.spelerService.getSpelers()
		.subscribe(spelers => this.spelers[i] = spelers.find(x => x.naam == this.berichtgebeurtenissen[i].speler));
		}
	}
	
	getProfielnummer(naam: string): number {
		for(let i=0;i<this.spelers.length;i++){
			if(this.spelers[i].naam==naam){
				return this.spelers[i].profielnummer;
			}
		}
		return 0;
	}
	
	getBerichtUrl(naam: string): string {
		return "https://www.weerwolvenvanwakkerdam.nl/forum/index.php?action=pm;sa=send;u="+this.getProfielnummer(naam);
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
	
	copyInputMessage(containerid){
    var range = document.createRange();
    range.selectNode(document.getElementById(containerid));
    window.getSelection().removeAllRanges();
		window.getSelection().addRange(range);
    document.execCommand("copy");
  }
	
	openBericht(index: number): void {
		this.copyInputMessage("titel"+index);
		
		window.open("https://www.weerwolvenvanwakkerdam.nl/forum/index.php?action=pm;sa=send;u="+this.spelers[index].profielnummer,'_blank');
	}
	
	terug(): void {
    this.location.back();
  }
	
	buildUrl(): string {
		var link = [];
		for(var i = 0; i < arguments.length; i++) {
			link.push(arguments[i].toLowerCase());
		}
		return '/#!/' + link.join('/');
	}
    
   

}
