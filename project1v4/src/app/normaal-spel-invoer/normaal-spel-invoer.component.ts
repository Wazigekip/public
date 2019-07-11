import { Component, OnInit, Input } from '@angular/core';

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

import { Enkeldoelwitkracht } from '../enkeldoelwitkracht';
import { EnkeldoelwitkrachtService } from '../enkeldoelwitkracht.service';

import { Spelspeler } from '../spelspeler';
import { SpelspelerService } from '../spelspeler.service';

import { Forumgebeurtenis } from '../forumgebeurtenis';
import { ForumgebeurtenisService } from '../forumgebeurtenis.service';

import { Gebeurtenis } from '../gebeurtenis';
import { GebeurtenisService } from '../gebeurtenis.service';

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
	enkeldoelwitdagkrachten: Enkeldoelwitkracht[];
	rollen: Rol[];

  constructor(
		private route: ActivatedRoute,
		private location: Location,
		private spelspelerService: SpelspelerService,
		private spelService: SpelService,
		private stemService: StemService,
		private dagService: DagService,
		private rolService: RolService,
		private forumgebeurtenisService: ForumgebeurtenisService,
		private gebeurtenisService: GebeurtenisService,
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
		this.getEnkeldoelwitdagkrachten();
		this.getRollen();
  }
	
	getRollen(): void {
		this.rollen=[];
		const aantal = +this.route.snapshot.paramMap.get('aantal');
		for(let i=0;i<aantal;i++){
			this.rolService.getRollen()
			.subscribe(rollen => this.rollen[i] = rollen.find(x => x.naam == this.spelspelers[i].rol));
		}
	}
	
	winstcontrole(): void {
		let goed=0;
		let weerwolf=0;
		for(let i=0;i<this.spelspelers.length;i++){
			if(this.spelspelers[i].dood==''&&this.rollen[i].alliantie=='goed'){
				goed++;
			}
			if(this.spelspelers[i].dood==''&&this.rollen[i].alliantie=='weerwolf'){
				weerwolf++;
			}
		}
		if(goed==0&&weerwolf==0){
			this.addForumgebeurtenis(this.spel.id, this.spel.dag, 'speltopic', 'Het spel is voorbij. Er zijn geen overlevenden.');
			this.addGebeurtenis(this.spel.id,this.spel.dag,'Het spel is voorbij. Niemand wint.');
		}else{
			if(goed==0){
				this.addForumgebeurtenis(this.spel.id, this.spel.dag, 'speltopic', 'Het spel is voorbij. De overlevende slechtjes hebben gewonnen.');
				this.addGebeurtenis(this.spel.id,this.spel.dag,'Het spel is voorbij. Slecht wint.');
			}
			if(weerwolf==0){
				this.addForumgebeurtenis(this.spel.id, this.spel.dag, 'speltopic', 'Het spel is voorbij. De overlevende goedjes hebben gewonnen.');
				this.addGebeurtenis(this.spel.id,this.spel.dag,'Het spel is voorbij. Goed wint.');
			}
		}
	}
	
	getEnkeldoelwitkrachten(): void {
		this.enkeldoelwitkrachten=[];
		const aantal = +this.route.snapshot.paramMap.get('aantal');
		for(let i=0;i<aantal;i++){
			this.enkeldoelwitkrachtService.getEnkeldoelwitkrachten()
			.subscribe(enkeldoelwitkrachten => this.enkeldoelwitkrachten[i] = enkeldoelwitkrachten.find(x => x.spel == this.spel.id&&x.speler==this.spelspelers[i].speler&&x.rol==this.spelspelers[i].rol&&x.dag==this.spel.dag));
		}
	}
	
	getEnkeldoelwitdagkrachten(): void {
		this.enkeldoelwitdagkrachten=[];
		const aantal = +this.route.snapshot.paramMap.get('aantal');
		for(let i=0;i<aantal;i++){
			this.enkeldoelwitkrachtService.getEnkeldoelwitkrachten()
			.subscribe(enkeldoelwitkrachten => this.enkeldoelwitdagkrachten[i] = enkeldoelwitkrachten.find(x => x.spel == this.spel.id&&x.speler==this.spelspelers[i].speler&&x.rol==this.spelspelers[i].rol&&x.dag==this.spel.dag-1));
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
		.subscribe(spelspelers => this.spelspelers = spelspelers.filter(x => x.spel == id && x.dood == ''));
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
	
	inactief(index: number): void {
		this.addGebeurtenis(this.spel.id,this.spel.dag,this.spelspelers[index].speler+' was inactief.');
		this.spelspelers[index].inactief++;
		if(this.spelspelers[index].inactief==3||(this.spelspelers[index].inactief==2&&this.spel.dag<4)){
			this.spelspelers[index].inactief*=2;
			if(this.spelspelers[index].dood==''){
				this.spelspelers[index].dood="onbekend";
				this.addForumgebeurtenis(this.spel.id, this.spel.dag, 'speltopic', this.spelspelers[index].speler+' sterft aan inactiviteit. De rol van '+this.spelspelers[index].speler+' blijft onbekend. En '+this.spelspelers[index].speler+' krijgt dus ook een spellenban vanwege inactiviteit.');
				this.addGebeurtenis(this.spel.id,this.spel.dag,this.spelspelers[index].speler+' sterft aan inactiviteit.');
				this.bmControle(index);
			}else{
				this.addForumgebeurtenis(this.spel.id, this.spel.dag, 'speltopic', 'Ondanks dat '+this.spelspelers[index].speler+' al dood is krijgt hij toch een spellenban vanwege inactiviteit.');
			}
			this.addGebeurtenis(this.spel.id,this.spel.dag,this.spelspelers[index].speler+' krijgt een spellenban vanwege inactiviteit.');
		}
		this.spelspelerService.updateSpelspeler(this.spelspelers[index]).subscribe();
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
			if(spelspeler.dood==''){
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
			this.addGebeurtenis(this.spel.id,this.spel.dag,this.spelspelers[lynchIndex].speler+' is verkozen tot burgemeester.');
			let namenlijstkracht=new Namenlijstkracht(this.spel.id,this.spelspelers[lynchIndex].speler,'burgemeester');
			this.namenlijstkrachtService.addNamenlijstkracht(namenlijstkracht as Namenlijstkracht)
			.subscribe();
		}else{
			lynchIndex=this.huidenWisselDagControle(lynchIndex);
			this.addForumgebeurtenis(this.spel.id, this.spel.dag, 'speltopic', 'Jullie hebben '+this.spelspelers[lynchIndex].speler+' opgehangen. '+this.spelspelers[lynchIndex].speler+' was een '+this.spelspelers[lynchIndex].rol+'.');
			this.addGebeurtenis(this.spel.id,this.spel.dag,this.spelspelers[lynchIndex].speler+' is gelyncht.');
			this.spelerDoden(lynchIndex,'dag');
		}
		this.dag.lynch = this.spelspelers[lynchIndex].speler;
		this.dagService.updateDag(this.dag)
      .subscribe();
	}
	
	vriendOpBezoekControle(index: number): number[] {
		let vriendIndex=[];
		for(let i=0;i<this.spelspelers.length;i++){
			if(this.enkeldoelwitkrachten[i]&&this.enkeldoelwitkrachten[i].rol=='vriend'&&this.enkeldoelwitkrachten[i].doelwit==this.spelspelers[index].speler){
				vriendIndex.push(this.getSpelerIndex(this.enkeldoelwitkrachten[i].speler));
			}
		}
		return vriendIndex;
	}
	
	
	
	getSpelerIndex(naam: string): number {
		for(let i=0;i<this.spelspelers.length;i++){
			if(this.spelspelers[i].speler==naam){
				return i;
			}
		}
		return 0;
	}
	
	vriendWegControle(index: number): boolean {
		for(let i=0;i<this.spelspelers.length;i++){
			if(this.enkeldoelwitkrachten[i]&&this.enkeldoelwitkrachten[i].rol=='vriend'&&this.enkeldoelwitkrachten[i].speler==this.spelspelers[index].speler){
				return true;
			}
		}
		return false;
	}
	
	beschermengelControle(index: number): boolean {
		for(let i=0;i<this.spelspelers.length;i++){
			if(this.enkeldoelwitkrachten[i]&&this.enkeldoelwitkrachten[i].rol=='beschermengel'&&this.enkeldoelwitkrachten[i].doelwit==this.spelspelers[index].speler){
				return true;
			}
		}
		return false;
	}
	
	lunchVerwerken(): boolean {
		if(!this.dag.lunch){
			return false;
		}
		for (var i=0;i<this.spelspelers.length;i++) {
			if(this.spelspelers[i].speler==this.dag.lunch){
				if(this.spelspelers[i].dood==''){
					let lunchIndex=i;
					if(!this.beschermengelControle(lunchIndex)){
						lunchIndex=this.huidenWisselControle(lunchIndex);
						if(!this.vriendWegControle(lunchIndex)){
							this.addForumgebeurtenis(this.spel.id, this.spel.dag, 'speltopic', 'Tijdens de nacht is '+this.spelspelers[lunchIndex].speler+' gestorven. '+this.spelspelers[lunchIndex].speler+' was een '+this.spelspelers[lunchIndex].rol+'.');
							this.addGebeurtenis(this.spel.id,this.spel.dag,this.spelspelers[lunchIndex].speler+' sterft door de lunch.');
							this.spelerDoden(lunchIndex,'nacht');
							let vriendIndex=this.vriendOpBezoekControle(lunchIndex);
							for(let j=0;j<vriendIndex.length;j++){
								this.addForumgebeurtenis(this.spel.id, this.spel.dag, 'speltopic', 'Tijdens de nacht is '+this.spelspelers[vriendIndex[j]].speler+' gestorven. '+this.spelspelers[vriendIndex[j]].speler+' was een '+this.spelspelers[vriendIndex[j]].rol+'.');
								this.addGebeurtenis(this.spel.id,this.spel.dag,'Vriend '+this.spelspelers[vriendIndex[j]].speler+' sterft door de lunch.');
								this.spelerDoden(vriendIndex[j],'nacht');
							}
							return true;
						}else{
							this.addGebeurtenis(this.spel.id,this.spel.dag,'De lunch mislukt dooordat het doelwit niet thuis is.');
						}
					}else{
						this.addGebeurtenis(this.spel.id,this.spel.dag,'De lunch mislukt ddor een bengelactie.');
					}
				}else{
					this.addGebeurtenis(this.spel.id,this.spel.dag,'De lunch mislukt omdat het doelwit al dood is.');
				}
			}
		}
		return false;
	}
	
	leeftNog(naam: string): boolean {
		for(let i=0;i<this.spelspelers.length;i++){
			if(this.spelspelers[i].speler==naam){
				if(this.spelspelers[i].dood==''){
					return true;
				}else{
					return false;
				}
			}
		}
		return false;
	}
	
	huidenWisselControle(index: number): number {
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
	
	huidenWisselDagControle(index: number): number {
		let doelwit=this.spelspelers[index].speler;
		let huidenwisselkrachten=this.enkeldoelwitdagkrachten.slice(0);
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
	
	bmControle(index: number): void {
		if(this.spelspelers[index].speler==this.spel.burgemeester){
			this.nieuweBm(index);
		}
	}
	
	jagerControle(index: number, dagNacht: string): void{
		if(this.spelspelers[index].rol=='jager'){
			this.dodeJager(index, dagNacht);
		}
	}
	
	dodeJager(index: number, dagNacht: string): void {
		let doelwitIndex=this.getJagerDoelwitIndex(index);
		if(doelwitIndex>0){
			this.jagerEffect(index,doelwitIndex,dagNacht);
		}
	}
	
	getJagerDoelwitIndex(index: number): number {
		for(let i=0;i<this.namenlijstkrachten[index].length;i++){
			for(let j=0;j<this.spelspelers.length;j++){
				if(this.namenlijstkrachten[index][i].doelwit==this.spelspelers[j].speler&&this.spelspelers[j].dood==''){
					return j+1;
				}
			}
		}
		return 0;
	}
	
	jagerEffect(index: number, doelwitIndex: number, dagNacht: string): void {
		
		if(dagNacht=='dag'){
			this.addForumgebeurtenis(this.spel.id, this.spel.dag, 'speltopic', this.spelspelers[index].speler+' knalde '+this.spelspelers[this.huidenWisselDagControle(doelwitIndex-1)].speler+ ' af. '+this.spelspelers[this.huidenWisselDagControle(doelwitIndex-1)].speler+' was een '+this.spelspelers[this.huidenWisselDagControle(doelwitIndex-1)].rol+'.');
			this.addGebeurtenis(this.spel.id,this.spel.dag,'Jager '+this.spelspelers[index].speler+' knalt '+this.spelspelers[this.huidenWisselDagControle(doelwitIndex-1)].speler+' af.');
			this.spelerDoden(this.huidenWisselDagControle(doelwitIndex-1),'dag');
		}else{
			this.addForumgebeurtenis(this.spel.id, this.spel.dag, 'speltopic', this.spelspelers[index].speler+' knalde '+this.spelspelers[this.huidenWisselControle(doelwitIndex-1)].speler+ ' af. '+this.spelspelers[this.huidenWisselControle(doelwitIndex-1)].speler+' was een '+this.spelspelers[this.huidenWisselControle(doelwitIndex-1)].rol+'.');
			this.addGebeurtenis(this.spel.id,this.spel.dag,'Jager '+this.spelspelers[index].speler+' knalt '+this.spelspelers[this.huidenWisselControle(doelwitIndex-1)].speler+' af.');
			this.spelerDoden(this.huidenWisselControle(doelwitIndex-1),'nacht');
		}
	}
	
	spelerDoden(index: number, dagNacht: string): void {
		this.spelspelers[index].dood=this.spelspelers[index].rol;
		this.spelspelerService.updateSpelspeler(this.spelspelers[index]).subscribe();
		this.jagerControle(index, dagNacht);	
		this.bmControle(index);
	}
	
	setRandomBm(index: number, doelwitIndex: number): void {
		this.addForumgebeurtenis(this.spel.id, this.spel.dag, 'speltopic', 'Aangezien '+this.spelspelers[index].speler+' geen geldige opvolgers heeft aangewezen heeft het lot bepaald dat '+this.spelspelers[doelwitIndex-1].speler+ ' de nieuwe burgemeester is.');
		this.addGebeurtenis(this.spel.id,this.spel.dag,this.spelspelers[index].speler+' wordt willekeurig geselecteerd als nieuwe bm.');
		this.spel.burgemeester=this.spelspelers[doelwitIndex-1].speler;
		this.spelService.updateSpel(this.spel).subscribe();
	}
	
	getNieuweRandomBmIndex(){
		for(let i=0;i<1000;i++){
			let rand=Math.floor(Math.random()*this.spelspelers.length);
			if(this.spelspelers[rand].dood==''){
				return rand+1;
			}
		}
		return 0;
	}
	
	setOpgegevenBm(index: number, doelwitIndex: number): void {
		
		this.addForumgebeurtenis(this.spel.id, this.spel.dag, 'speltopic', this.spelspelers[index].speler+' wijst '+this.spelspelers[doelwitIndex-1].speler+ ' aan als nieuwe burgemeester.');
		this.addGebeurtenis(this.spel.id,this.spel.dag,this.spelspelers[index].speler+' wijst '+this.spelspelers[doelwitIndex-1].speler+' aan als de nieuwe bm.');
		this.spel.burgemeester=this.spelspelers[doelwitIndex-1].speler;
		this.spelService.updateSpel(this.spel).subscribe();
	}
	
	getNieuweBmIndex(): number {
		for(let i=0;i<this.bmopvolgers.length;i++){
			for(let j=0;j<this.spelspelers.length;j++){
				if(this.bmopvolgers[i].doelwit==this.spelspelers[j].speler&&this.spelspelers[j].dood==''){
					return j+1;
				}
			}
		}
		return 0;
	}
	
	getBmIndex(): number {
		for(let i=0;i<this.spelspelers.length;i++){
			if(this.spelspelers[i].speler==this.spel.burgemeester){
				return i;
			}
		}
		return 0;
	}
	
	nieuweBm(index: number): void {
		let doelwitIndex=this.getNieuweBmIndex();
		if(doelwitIndex>0){
			this.setOpgegevenBm(index,doelwitIndex);
		}else{
			doelwitIndex=this.getNieuweRandomBmIndex();
			if(doelwitIndex>0){
				this.setRandomBm(index,doelwitIndex);
			}
		}
	}
	
	rollenGezien(index: number): string {
		let vriendIndex=this.vriendOpBezoekControle(index);
		let rollenGezien=this.spelspelers[index].rol;
		for(let k=0;k<vriendIndex.length;k++){
			if(k<vriendIndex.length-1){
				rollenGezien=rollenGezien+', '+this.spelspelers[vriendIndex[k]].rol;
			}else{
				rollenGezien=rollenGezien+' en '+this.spelspelers[vriendIndex[k]].rol;
			}
		}
		return rollenGezien;
	}
	
	zienervisioenenVerwerken(): void {
		for(let i=0;i<this.spelspelers.length;i++){
			if(this.spelspelers[i].rol=='ziener'&&this.spelspelers[i].dood==''){
				if(this.enkeldoelwitkrachten[i]&&this.enkeldoelwitkrachten[i].doelwit!=''){
					for(let j=0;j<this.spelspelers.length;j++){
						if(this.spelspelers[j].speler==this.enkeldoelwitkrachten[i].doelwit){
							let zienerIndex=j;
							if(this.spelspelers[j].dood==''){
								zienerIndex=this.huidenWisselControle(zienerIndex);
								if(!this.vriendWegControle(zienerIndex)){
									let rollenGezien=this.rollenGezien(zienerIndex);
									this.addBerichtgebeurtenis(this.spel.id,this.spel.dag,this.spelspelers[i].speler,this.spel.id+' zienervisioen dag '+this.spel.dag,'Je visioen op '+this.spelspelers[j].speler+' is gelukt. Je zag '+rollenGezien+'.');
									this.addGebeurtenis(this.spel.id,this.spel.dag,'Ziener '+this.spelspelers[i].speler+' ziet '+rollenGezien+'.');
								}else{
									this.addBerichtgebeurtenis(this.spel.id,this.spel.dag,this.spelspelers[i].speler,this.spel.id+' zienervisioen dag '+this.spel.dag,'Je visioen op '+this.spelspelers[j].speler+' is mislukt. Je zag helemaal niks.');
									this.addGebeurtenis(this.spel.id,this.spel.dag,'Visioen van ziener '+this.spelspelers[i].speler+' mislukt doordat het doelwit niet thuis is.');
								}
							}else{
								this.addBerichtgebeurtenis(this.spel.id,this.spel.dag,this.spelspelers[i].speler,this.spel.id+' zienervisioen dag '+this.spel.dag,'Je visioen op '+this.spelspelers[j].speler+' is mislukt. Je zag helemaal niks.');
								this.addGebeurtenis(this.spel.id,this.spel.dag,'Visioen van ziener '+this.spelspelers[i].speler+' mislukt doordat het doelwit dood is.');
							}
						}
					}
				}
			}
		}
	}
	
	inactiviteitscontrole(): void {
		for(let i=0;i<this.stemmen.length;i++){
			if(this.stemmen[i].stem==0){
				this.inactief(this.getSpelerIndex(this.stemmen[i].stemmer));
			}
		}
	}
	
	dagverwerken(): void {	
		let nachtActiviteit=0;
		this.lynchVerwerken();
		//this.inactiviteitscontrole();
		
		if(this.lunchVerwerken()){
			nachtActiviteit++;
		}
		
		this.zienervisioenenVerwerken();
		if(nachtActiviteit==0){
			this.addForumgebeurtenis(this.spel.id, this.spel.dag, 'speltopic', 'Tijdens de nacht is niks belangrijks gebeurd.');
		}
		this.winstcontrole();
		
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
	
	addGebeurtenis(spel: number, dag: number, gebeurtenis: string): void {
		this.gebeurtenisService.addGebeurtenis({spel, dag, gebeurtenis} as Gebeurtenis)
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