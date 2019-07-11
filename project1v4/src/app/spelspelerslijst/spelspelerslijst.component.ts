import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Stem } from '../stem';
import { StemService } from '../stem.service';

import { Dag } from '../dag';
import { DagService } from '../dag.service';

import { Rol } from '../rol';
import { RolService } from '../rol.service';

import { Spel } from '../spel';
import { SpelService } from '../spel.service';

import { Namenlijstkracht } from '../namenlijstkracht';
import { NamenlijstkrachtService } from '../namenlijstkracht.service';

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
	rollen: Rol[];

  constructor(
		private route: ActivatedRoute,
		private location: Location,
		private spelspelerService: SpelspelerService,
		private spelService: SpelService,
		private stemService: StemService,
		private rolService: RolService,
		private dagService: DagService,
		private namenlijstkrachtService: NamenlijstkrachtService
	) { }

  ngOnInit() {
		this.getSpel();
		this.getSpelspelers();
		this.getStemmen();
		this.getRollen();
  }
	
	getRollen(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.rolService.getRollen()
		.subscribe(rollen => this.rollen = rollen);
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
	
	veranderRol(indexrol:number,rol:string): void {
	
		this.spelspelers[indexrol].rol=rol;
		this.spelspelerService.updateSpelspeler(this.spelspelers[indexrol])
      .subscribe();
		this.getSpelspelers();
	}
	
	addSpelspeler(speler: string): void {
    speler = speler.trim();
		let rol=this.rollen[0].naam;
		const spel = +this.route.snapshot.paramMap.get('id');
    if (!speler) { return; }
		let spelspeler=new Spelspeler(spel,speler);
    this.spelspelerService.addSpelspeler(spelspeler as Spelspeler)
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
		let stem = 0;
		
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
		
		let rollenVerdelen=new Array();
		let rollenGehad=new Array();
		
		for( var j=0;j<this.spelspelers.length;j++){
			rollenVerdelen.push(this.spelspelers[j].rol);
			rollenGehad.push(0);
		}
		
		for (let spelspeler of this.spelspelers) {
			this.addStem(spelspeler.speler);
			let a=Math.floor(Math.random()*this.spelspelers.length);
			while(rollenGehad[a]==1){
				a=Math.floor(Math.random()*this.spelspelers.length);
			}
			spelspeler.rol=rollenVerdelen[a];
			rollenGehad[a]=1;
	
			if(spelspeler.rol=='jager'){
				let namenlijstkracht=new Namenlijstkracht(this.spel.id,spelspeler.speler,spelspeler.rol);
				this.namenlijstkrachtService.addNamenlijstkracht(namenlijstkracht as Namenlijstkracht)
			.subscribe();
			}
			
			this.spelspelerService.updateSpelspeler(spelspeler)
      .subscribe();
      let berichtgebeurtenis=new Berichtgebeurtenis(this.spel.id,0,spelspeler.speler,this.spel.id+' rol','Hallo '+spelspeler.speler+'. Je bent een '+spelspeler.rol+' in dit spel.');
			this.berichtgebeurtenisService.addBerichtgebeurtenis(berichtgebeurtenis as Berichtgebeurtenis).subscribe();
		}
	}
	
	terug(): void {
    this.location.back();
  }
}
