import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Spel } from '../spel';
import { SpelService } from '../spel.service';

import { Spelspeler } from '../spelspeler';
import { SpelspelerService } from '../spelspeler.service';

@Component({
  selector: 'app-infotopic-uitvoer',
  templateUrl: './infotopic-uitvoer.component.html',
  styleUrls: ['./infotopic-uitvoer.component.scss']
})
export class InfotopicUitvoerComponent implements OnInit {
	spel: Spel;
	spelspelers: Spelspeler[];
	infotekst: string;
	test: Spel;
	myText: string;

  constructor(
		private route: ActivatedRoute,
		private location: Location,
		private spelService: SpelService,
		private spelspelerService: SpelspelerService
	) { }

  ngOnInit() {
		
		this.getSpel();
		this.getSpelspelers();
		this.infotext();
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
	
	infotext(): string {
		
		let tekst = "";
		
		tekst+="[table]";
		tekst+="[tr]";
			tekst+="[td]";
			tekst+="Naam";
			tekst+="[td]";
			tekst+="[td]";
			tekst+="Inactief";
			tekst+="[td]";
			tekst+="[td]";
			tekst+="Dood";
			tekst+="[td]";
			tekst+="[/tr]";
		for(var i=0;i<this.spelspelers.length;i++){
			tekst+="[tr]";
			tekst+="[td]";
			tekst+=this.spelspelers[i].speler;
			tekst+="[td]";
			tekst+="[td]";
			tekst+="0";
			tekst+="[td]";
			tekst+="[td]";
			tekst+="Nee";
			tekst+="[td]";
			tekst+="[/tr]";
		}
		tekst+="[/table]";
		
		this.infotekst=tekst;
		return tekst;
	}
	
	copyInputMessage(containerid){
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
