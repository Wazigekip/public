import { Component, OnInit, Input } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Stem } from '../stem';
import { StemService } from '../stem.service';

import { Dag } from '../dag';
import { DagService } from '../dag.service';

import { Spel } from '../spel';
import { SpelService } from '../spel.service';

import { Namenlijstkracht } from '../namenlijstkracht';
import { NamenlijstkrachtService } from '../namenlijstkracht.service';

import { Enkeldoelwitkracht } from '../enkeldoelwitkracht';
import { EnkeldoelwitkrachtService } from '../enkeldoelwitkracht.service';

import { Spelspeler } from '../spelspeler';
import { SpelspelerService } from '../spelspeler.service';

import { Forumgebeurtenis } from '../forumgebeurtenis';
import { ForumgebeurtenisService } from '../forumgebeurtenis.service';

import { Berichtgebeurtenis } from '../berichtgebeurtenis';
import { BerichtgebeurtenisService } from '../berichtgebeurtenis.service';

@Component({
  selector: 'app-normaal-spel-invoer',
  templateUrl: './normaal-spel-invoer.component.html',
  styleUrls: ['./normaal-spel-invoer.component.scss']
})
export class NormaalSpelInvoerComponent implements OnInit {
	spelspelers: Spelspeler[];
	spel: Spel;
	stemmen: Stem[];
	dag: Dag;
	dagen: Dag[];
	namenlijstkrachten: Namenlijstkracht[][];
	enkeldoelwitkrachten: Enkeldoelwitkracht[];
	krachten: Namenlijstkracht[];
	aantalspelers: number;
	bmopvolgers: Namenlijstkracht[];

  constructor(
		private route: ActivatedRoute,
		private location: Location,
		private spelspelerService: SpelspelerService,
		private spelService: SpelService,
		private stemService: StemService,
		private dagService: DagService,
		private forumgebeurtenisService: ForumgebeurtenisService,
		private berichtgebeurtenisService: BerichtgebeurtenisService,
		private namenlijstkrachtService: NamenlijstkrachtService,
		private enkeldoelwitkrachtService: EnkeldoelwitkrachtService
	) { }

  ngOnInit() {
		
		this.getSpel();
		this.getSpelspelers();
		this.getStemmen();
		this.getDag();
		this.getDagen();
		this.getNamenlijstkrachten();
		this.getEnkeldoelwitkrachten();
  }
	
	getEnkeldoelwitkrachten(): void {
		this.enkeldoelwitkrachten=[];
		const aantal = +this.route.snapshot.paramMap.get('aantal');
		for(let i=0;i<aantal;i++){
			this.enkeldoelwitkrachtService.getEnkeldoelwitkrachten()
			.subscribe(enkeldoelwitkrachten => this.enkeldoelwitkrachten[i] = enkeldoelwitkrachten.find(x => x.spel == this.spel.id&&x.speler==this.spelspelers[i].speler&&x.rol==this.spelspelers[i].rol&&x.dag==this.spel.dag));
		}
	}
	
	getNamenlijstkrachten(): void {
		this.namenlijstkrachten=[];
		const aantal = +this.route.snapshot.paramMap.get('aantal');
		
		
		for(let i=0;i<aantal;i++){
			this.namenlijstkrachtService.getNamenlijstkrachten()
			.subscribe(namenlijstkrachten => this.namenlijstkrachten[i] = namenlijstkrachten.filter(x => x.spel == this.spel.id&&x.speler==this.spelspelers[i].speler&&x.rol==this.spelspelers[i].rol));
			
		}
		this.namenlijstkrachtService.getNamenlijstkrachten()
			.subscribe(namenlijstkrachten => this.bmopvolgers = namenlijstkrachten.filter(x => x.spel == this.spel.id&&x.speler==this.spel.burgemeester&&x.rol=='burgemeester'));
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
		/*
		this.dagService.getDagen()
		.subscribe(dagen => this.nieuwedag = dagen.find(x => x.spel == id && x.dag == this.spel.dag));*/
	}
	
	getDagen(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.dagService.getDagen()
		.subscribe(dagen => this.dagen = dagen);
	}
	
	veranderStem(indexstemmer:number,stem:number): void {
	
		this.stemmen[indexstemmer].stem=stem;
		this.stemService.updateStem(this.stemmen[indexstemmer])
      .subscribe();
	}
	
	veranderLunch(lunch:string): void {
	
		this.dag.lunch=lunch;
		this.dagService.updateDag(this.dag)
      .subscribe();
		this.getDag();
	}
	
	opslaan(): void {
		
		for(let stem of this.stemmen){
			this.stemService.updateStem(stem)
      .subscribe();
		}
	}
	
	getBmstem(): number {
		for(var i=0;i<this.stemmen.length;i++){
			if(this.stemmen[i].stem>0){
				if(this.stemmen[i].stemmer==this.spel.burgemeester){
					return i+1;
				}
			}
		}
		return 0;
	}
	
	vulStemmenArray(): number[] {
		let stemmenTellen=new Array();
		for(var i=0;i<this.stemmen.length;i++){
			stemmenTellen.push(0);
		}
		for(var i=0;i<this.stemmen.length;i++){
			if(this.stemmen[i].stem>0){
				stemmenTellen[this.stemmen[i].stem-1]++;
			}
		}
		return stemmenTellen;
	}
	
	getLynchIndex(): number {
		let stemmenTellen=this.vulStemmenArray();
		let bmstem=this.getBmstem();
		let maxStemmen=0;
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
		return maxId;
	}
	
	addStemmenNieuweDag(): void {
		for (let spelspeler of this.spelspelers) {
			if(spelspeler.dood==0){
				this.addStem(spelspeler.speler);
			}
		}
	}
	
	dagVerhogen(): void {
		this.spel.dag++;
		this.spelService.updateSpel(this.spel)
      .subscribe();
		this.addDag();
	}
	
	lynchVerwerken(): void {
		let lynchIndex=this.getLynchIndex();
		if(this.spel.dag==1){
			this.spel.burgemeester=this.spelspelers[lynchIndex].speler;
			this.spelService.updateSpel(this.spel)
      .subscribe();
			this.addForumgebeurtenis(this.spel.id, this.spel.dag, 'speltopic', 'Jullie verkozen '+this.spelspelers[lynchIndex].speler+' tot burgemeester.');
			let namenlijstkracht=new Namenlijstkracht(this.spel.id,this.spelspelers[lynchIndex].speler,'burgemeester');
			this.namenlijstkrachtService.addNamenlijstkracht(namenlijstkracht as Namenlijstkracht)
			.subscribe();
		}else{
			this.addForumgebeurtenis(this.spel.id, this.spel.dag, 'speltopic', 'Jullie hebben '+this.spelspelers[lynchIndex].speler+' opgehangen. '+this.spelspelers[lynchIndex].speler+' was een '+this.spelspelers[lynchIndex].rol+'.');
			this.spelerDoden(lynchIndex);
		}
		this.dag.lynch = this.spelspelers[lynchIndex].speler;
		this.dagService.updateDag(this.dag)
      .subscribe();
	}
	
	lunchVerwerken(): void {
		if(!this.dag.lunch){
			this.addForumgebeurtenis(this.spel.id, this.spel.dag, 'speltopic', 'Tijdens de nacht is niks belangrijks gebeurd.');
		}
		for (var i=0;i<this.spelspelers.length;i++) {
			if(this.spelspelers[i].speler==this.dag.lunch){
				if(this.spelspelers[i].dood==0){
					let lunchindex=i;
					lunchindex=this.huidenwisselcontrole(lunchindex);
					this.addForumgebeurtenis(this.spel.id, this.spel.dag, 'speltopic', 'Tijdens de nacht is '+this.spelspelers[lunchindex].speler+' gestorven. '+this.spelspelers[lunchindex].speler+' was een '+this.spelspelers[lunchindex].rol+'.');
					this.spelerDoden(lunchindex);
				}else{
					this.addForumgebeurtenis(this.spel.id, this.spel.dag, 'speltopic', 'Tijdens de nacht is niks belangrijks gebeurd.');
				}
			}
		}
	}
	
	leeftNog(naam: string): boolean {
		for(let i=0;i<this.spelspelers.length;i++){
			if(this.spelspelers[i].speler==naam){
				if(this.spelspelers[i].dood==0){
					return true;
				}else{
					return false;
				}
			}
		}
		return false;
	}
	
	huidenwisselcontrole(index: number): number {
		let doelwit=this.spelspelers[index].speler;
		let huidenwisselkrachten=this.enkeldoelwitkrachten.slice(0);
		
		huidenwisselkrachten.sort((leftSide, rightSide): number => {
			if(leftSide.id > rightSide.id) return -1;
			if(leftSide.id < rightSide.id) return 1;
			return 0;
		});
		for(let i=0;i<huidenwisselkrachten.length;i++){
			
			if(huidenwisselkrachten[i]&&huidenwisselkrachten[i].rol=='huidenwisselaar'&&((huidenwisselkrachten[i].speler==doelwit&&this.leeftNog(huidenwisselkrachten[i].doelwit))||(huidenwisselkrachten[i].doelwit==doelwit&&this.leeftNog(huidenwisselkrachten[i].speler)))){
				
				if(huidenwisselkrachten[i].speler==doelwit){
					doelwit=huidenwisselkrachten[i].doelwit;
				}else{
					doelwit=huidenwisselkrachten[i].speler;
				}
			}
		}
		for(let i=0;i<this.spelspelers.length;i++){
			if(this.spelspelers[i].speler==doelwit){
				return i;
			}
		}
		
		return index;
	}
	
	spelerDoden(spelspelerindex: number): void {
		this.spelspelers[spelspelerindex].dood=this.spel.dag;
		this.spelspelerService.updateSpelspeler(this.spelspelers[spelspelerindex])
    .subscribe();	
		
		if(this.spelspelers[spelspelerindex].rol=='jager'){
			
			let doelwitIndex=0;
			for(let j=0;j<this.namenlijstkrachten[spelspelerindex].length&&doelwitIndex==0;j++){
				
				for(let i=0;i<this.spelspelers.length;i++){
					if(this.namenlijstkrachten[spelspelerindex][j].doelwit==this.spelspelers[i].speler&&this.spelspelers[i].dood==0){
						doelwitIndex=i+1;
					}
				}
			}
			if(doelwitIndex>0){
				this.addForumgebeurtenis(this.spel.id, this.spel.dag, 'speltopic', this.spelspelers[spelspelerindex].speler+' knalde '+this.spelspelers[doelwitIndex-1].speler+ ' af. '+this.spelspelers[doelwitIndex-1].speler+' was een '+this.spelspelers[doelwitIndex-1].rol+'.');
				this.spelerDoden(doelwitIndex-1);
			}
		}
		
		if(this.spelspelers[spelspelerindex].speler==this.spel.burgemeester){
			let doelwitIndex=0;
			for(let j=0;j<this.bmopvolgers.length&&doelwitIndex==0;j++){
				
				for(let i=0;i<this.spelspelers.length;i++){
					if(this.bmopvolgers[j].doelwit==this.spelspelers[i].speler&&this.spelspelers[i].dood==0){
						doelwitIndex=i+1;
					}
				}
			}
			if(doelwitIndex>0){
				this.addForumgebeurtenis(this.spel.id, this.spel.dag, 'speltopic', this.spelspelers[spelspelerindex].speler+' wijst '+this.spelspelers[doelwitIndex-1].speler+ ' aan als nieuwe burgemeester.');
				
				this.spel.burgemeester=this.spelspelers[doelwitIndex-1].speler;
				this.spelService.updateSpel(this.spel)
      .subscribe();
			}else{
				for(let k=0;k<1000&&doelwitIndex==0;k++){
					let rand=Math.floor(Math.random()*this.spelspelers.length);
					if(this.spelspelers[rand].dood==0){
						doelwitIndex=rand+1;
					}
				}
				if(doelwitIndex>0){
					this.addForumgebeurtenis(this.spel.id, this.spel.dag, 'speltopic', 'Aangezien '+this.spelspelers[spelspelerindex].speler+' geen geldige opvolgers heeft aangewezen heeft het lot bepaald dat '+this.spelspelers[doelwitIndex-1].speler+ ' de nieuwe burgemeester is.');
				
					this.spel.burgemeester=this.spelspelers[doelwitIndex-1].speler;
					this.spelService.updateSpel(this.spel)
				.subscribe();
				}
			}
		}
	}
	
	zienervisioenenVerwerken(): void {
		for(let i=0;i<this.spelspelers.length;i++){
			if(this.spelspelers[i].rol=='ziener'&&this.spelspelers[i].dood==0){
				if(this.enkeldoelwitkrachten[i]&&this.enkeldoelwitkrachten[i].doelwit!=''){
					for(let j=0;j<this.spelspelers.length;j++){
						if(this.spelspelers[j].speler==this.enkeldoelwitkrachten[i].doelwit){
							if(this.spelspelers[j].dood==0){
								let zienerindex=j;
								zienerindex=this.huidenwisselcontrole(zienerindex);
								this.addBerichtgebeurtenis(this.spel.id,this.spel.dag,this.spelspelers[i].speler,this.spel.id+' zienervisioen dag '+this.spel.dag,'Je visioen op '+this.spelspelers[j].speler+' is gelukt. Je zag dat '+this.spelspelers[j].speler+' een '+this.spelspelers[zienerindex].rol+' is.');
							}else{
								this.addBerichtgebeurtenis(this.spel.id,this.spel.dag,this.spelspelers[i].speler,this.spel.id+' zienervisioen dag '+this.spel.dag,'Je visioen is mislukt. Je zag helemaal niks.');
							}
						}
					}
				}
			}
		}
	}
	
	dagverwerken(): void {	
		this.lynchVerwerken();
		this.lunchVerwerken();
		
		this.zienervisioenenVerwerken();
		
		this.dagVerhogen();
		this.addStemmenNieuweDag();
		this.terug();
	}
	
	addBerichtgebeurtenis(spel: number, dag: number, speler: string, titel: string, gebeurtenis: string): void {
		this.berichtgebeurtenisService.addBerichtgebeurtenis({spel, dag, speler, titel, gebeurtenis} as Berichtgebeurtenis)
			.subscribe();
	}
	
	addForumgebeurtenis(spel: number, dag: number, topic: string, gebeurtenis: string): void {
		this.forumgebeurtenisService.addForumgebeurtenis({spel, dag, topic, gebeurtenis} as Forumgebeurtenis)
			.subscribe();
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
	
	rolkracht(rol: string){
		if(rol=='burger'||rol=='weerwolf'){
			return false;
		}
		return true;
	}
}