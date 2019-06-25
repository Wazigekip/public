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
	nieuwedag: Dag;
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
		.subscribe(spelspelers => this.spelspelers = spelspelers.filter(x => x.spel == id && x.dood == 0));
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
		
		this.dagService.getDagen()
		.subscribe(dagen => this.nieuwedag = dagen.find(x => x.spel == id && x.dag == this.spel.dag));
	}
	
	getDagen(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.dagService.getDagen()
		.subscribe(dagen => this.dagen = dagen);
	}
	
	veranderStem(indexstemmer:number,stem:number): void {
	
		this.nieuwestemmen[indexstemmer].stem=stem;
		this.stemService.updateStem(this.nieuwestemmen[indexstemmer])
      .subscribe();
	}
	
	veranderLunch(lunch:string): void {
	
		this.nieuwedag.lunch=lunch;
		this.dagService.updateDag(this.nieuwedag)
      .subscribe();
	}
	
	opslaan(): void {
		
		for(let stem of this.stemmen){
			this.stemService.updateStem(stem)
      .subscribe();
		}
	}
	
	dagverwerken(): void {
		let bmstem=0;
		let stemmenTellen=<number[]> [];
		for(let stem of stemmenTellen){
			stemmenTellen.push(0);
		}
		
		for(var i=0;i<this.stemmen.length;i++){
			if(this.stemmen[i].stem>0){
				stemmenTellen[this.stemmen[i].stem-1]++;
				if(this.stemmen[i].stemmer==this.spel.burgemeester){
					bmstem=i+1;
				}
			}
		}
		
		let maxStemmen=stemmenTellen[0];
		let maxId=0;
		
		for(var i=0; i<stemmenTellen.length; i++){
			if(maxStemmen<=stemmenTellen[i]){
				if(maxStemmen==stemmenTellen[i]){
					if(i==bmstem-1){
						maxStemmen=stemmenTellen[i];
						maxId=i;
					}else{
						if(maxId!=bmstem-1){
							if(Math.random()*100<50){
								maxStemmen=stemmenTellen[i];
								maxId=i;
							}
						}
					}
				}else{
					maxStemmen=stemmenTellen[i];
					maxId=i;
				}
			}
		}
		
		this.nieuwedag.lynch = this.spelspelers[maxId].speler;
		this.dagService.updateDag(this.nieuwedag)
      .subscribe();
			
		this.spel.dag++;
		this.spelService.updateSpel(this.spel)
      .subscribe();
		this.addDag();
		
		for (let spelspeler of this.spelspelers) {
			this.addStem(spelspeler.speler);
		}
		this.terug();
	}
	
	addDag(): void {
		const spel = +this.route.snapshot.paramMap.get('id');
		let dag=this.spel.dag;
		let lunch='';
		let lynch='';
		this.dagService.addDag({spel, dag, lynch, lunch} as Dag)
			.subscribe();
	}
	
	addStem(stemmer: string): void {
		const spel = +this.route.snapshot.paramMap.get('id');
		let dag = this.spel.dag;
		let stem = 0;
		
		this.stemService.addStem({spel, stemmer, stem, dag} as Stem)
			.subscribe(stem => {
        this.stemmen.push(stem);
      });
	}
	
	terug(): void {
    this.location.back();
  }
}
