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
	infotopicRegels: string[];

  constructor(
		private route: ActivatedRoute,
		private location: Location,
		private spelService: SpelService,
		private spelspelerService: SpelspelerService
	) { }

  ngOnInit() {
		
		this.getSpel();
		this.getSpelspelers();
		//this.infotext();
		this.getInfotopicTekst();
  }
	
	getInfotopicTekst(): void {
		this.infotopicRegels=[];
		this.myText="boeie";
		this.infotopicRegels.push("[table]");
		this.infotopicRegels.push("[tr][td][b]Naam[/b][/td][td][b]Rol[/b][/td][td][b]Inactief/dood[/b][/td][/tr]");
		
		/*
		<div class="regel">[table]</div>
			<div class="regel">[tr][td][b]Naam[/b][/td][td][b]Rol[/b][/td][td][b]Inactief/dood[/b][/td][/tr]</div>
			<div *ngFor="let spelspeler of spelspelers">
			<div class="regel"><div class="inregel">[tr][td]</div>
			<div *ngIf="spelspeler.dood==''&&spelspeler.speler==spel.burgemeester" class="inregel">[b][color=red]{{spelspeler.speler}}[/color][/b]</div>
			<div *ngIf="spelspeler.dood==''&&spelspeler.speler!=spel.burgemeester" class="inregel">{{spelspeler.speler}}</div>
			<div *ngIf="spelspeler.dood!=''" class="inregel">[s]{{spelspeler.speler}}[/s]</div>
			<div class="inregel">[/td][td]{{spelspeler.dood}}[/td][td]</div>
			<div *ngIf="spelspeler.inactief>3" class="inregel">{{spelspeler.inactief/2}} en ja</div>
			<div *ngIf="spelspeler.inactief<3" class="inregel">{{spelspeler.inactief}} en nee</div>
			<div class="inregel">[/td][/tr]</div>
			</div>
			</div>
			<div class="regel">[/table]</div>
			</div>*/
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
