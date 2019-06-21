import { Component, OnInit } from '@angular/core';

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
  selector: 'app-spelspelerslijst',
  templateUrl: './spelspelerslijst.component.html',
  styleUrls: ['./spelspelerslijst.component.scss']
})
export class SpelspelerslijstComponent implements OnInit {
	spelspelers: Spelspeler[];
	spel: Spel;
	stemmen: Stem[];

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
	
	getStemmen(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.stemService.getStemmen()
		.subscribe(stemmen => this.stemmen = stemmen);
	}
	
	addSpelspeler(speler: string): void {
    speler = speler.trim();
		const spel = +this.route.snapshot.paramMap.get('id');
    if (!speler) { return; }
		
    this.spelspelerService.addSpelspeler({speler,spel} as Spelspeler)
      .subscribe(spelspeler => {
        this.spelspelers.push(spelspeler);
				
      });
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
		let stem = '';
		
		this.stemService.addStem({spel, stemmer, stem, dag} as Stem)
			.subscribe(stem => {
        this.stemmen.push(stem);
      });
	}
	
	bevestig(): void {
		let aantalwolven=Math.floor(this.spelspelers.length/3);
		let i=0;
		this.spel.dag++;
		this.spelService.updateSpel(this.spel)
      .subscribe();
		this.addDag();
		
		for (let spelspeler of this.spelspelers) {
			this.addStem(spelspeler.speler);
			
			i++;
			if(aantalwolven==0){
				spelspeler.rol='burger';
			}else{
				if(this.spelspelers.length-i<aantalwolven){
					spelspeler.rol='wolf';
					aantalwolven--;
				}else{
					if(Math.random()*100<30){
						spelspeler.rol='wolf';
						aantalwolven--;
					}else{
						spelspeler.rol='burger';
					}
				}
			}
			this.spelspelerService.updateSpelspeler(spelspeler)
      .subscribe();
		}
		
		
		
	}
}
