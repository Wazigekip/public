import { Component, OnInit, Input } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Stem } from '../stem';
import { StemService } from '../stem.service';

import { Dag } from '../dag';
import { DagService } from '../dag.service';

import { Spel } from '../spel';
import { SpelService } from '../spel.service';

import { Spelspeler } from '../spelspeler';
import { SpelspelerService } from '../spelspeler.service';

@Component({
  selector: 'app-normaal-spel-invoer',
  templateUrl: './normaal-spel-invoer.component.html',
  styleUrls: ['./normaal-spel-invoer.component.scss']
})
export class NormaalSpelInvoerComponent implements OnInit {
	spelspelers: Spelspeler[];
	spel: Spel;
	stemmen: Stem[];
	nieuwestemmen: Stem[];
	dag: Dag;
	dagen: Dag[];

  constructor(
		private route: ActivatedRoute,
		private location: Location,
		private spelspelerService: SpelspelerService,
		private spelService: SpelService,
		private stemService: StemService,
		private dagService: DagService
	) { }

  ngOnInit() {
		this.getSpel();
		this.getSpelspelers();
		this.getStemmen();
		this.getDag();
		this.getDagen();
  }
	
	getSpelspelers(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.spelspelerService.getSpelspelers()
		.subscribe(spelspelers => this.spelspelers = spelspelers.filter(x => x.spel == id));
	}
	
	getStemmen(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.stemService.getStemmen()
		.subscribe(stemmen => this.stemmen = stemmen.filter(x => x.spel == id && x.dag==this.spel.dag));
		
		this.stemService.getStemmen()
		.subscribe(stemmen => this.nieuwestemmen = stemmen.filter(x => x.spel == id && x.dag==this.spel.dag));
	}
	
	getSpel(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.spelService.getSpellen()
		.subscribe(spellen => this.spel = spellen.find(x => x.id == id));
	}
	
	getDag(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.dagService.getDagen()
		.subscribe(dagen => this.dag = dagen.find(x => x.spel == id && x.dag == this.spel.dag));
	}
	
	getDagen(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.dagService.getDagen()
		.subscribe(dagen => this.dagen = dagen);
	}
	
	veranderStem(indexstemmer:number,stem:string): void {
	
		this.nieuwestemmen[indexstemmer].stem=stem;
		this.stemService.updateStem(this.nieuwestemmen[indexstemmer])
      .subscribe();
	}
	
	veranderLunch(lunch:string): void {
	
		this.dag.lunch=lunch;
		this.dagService.updateDag(this.dag)
      .subscribe();
	}
	
	opslaan(): void {
		
		for(let stem of this.stemmen){
			this.stemService.updateStem(stem)
      .subscribe();
		}
	}
	
	dagverwerken(): void {
		let stemmen=new Array();
		let aantalstemmen=0;
		for(let stem of this.spelspelers){
			if(stemmen[stem.speler]){
				stemmen[stem.speler]++;
			}else{
				stemmen[stem.speler]=1;
			}
			if(aantalstemmen < stemmen[stem.speler]){
				aantalstemmen=stemmen[stem.speler];
			}
		}
	}
	
	

}
