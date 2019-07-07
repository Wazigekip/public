import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Spelspeler } from '../spelspeler';
import { SpelspelerService } from '../spelspeler.service';

import { Namenlijstkracht } from '../namenlijstkracht';
import { NamenlijstkrachtService } from '../namenlijstkracht.service';

@Component({
  selector: 'app-namenlijstkracht-invoer',
  templateUrl: './namenlijstkracht-invoer.component.html',
  styleUrls: ['./namenlijstkracht-invoer.component.scss']
})

export class NamenlijstkrachtInvoerComponent implements OnInit {
	spelspeler: Spelspeler;
	spelspelers: Spelspeler[];
	namenlijstkrachten: Namenlijstkracht[];

  constructor(
		private route: ActivatedRoute,
		private location: Location,
		private spelspelerService: SpelspelerService,
		private namenlijstkrachtService: NamenlijstkrachtService
	) { }

  ngOnInit() {
		this.getSpelspeler();
		this.getSpelspelers();
		this.getNamenlijstkrachten();
  }
	
	getRol(): string {
		const rol = this.route.snapshot.paramMap.get('rol');
		return rol;
	}
	
	getSpelspeler(): void {
		const speler = +this.route.snapshot.paramMap.get('speler');
		this.spelspelerService.getSpelspelers()
		.subscribe(spelspelers => this.spelspeler = spelspelers.find(x => x.id == speler));
	}
	
	getSpelspelers(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.spelspelerService.getSpelspelers()
		.subscribe(spelspelers => this.spelspelers = spelspelers.filter(x => x.spel == id));
	}
	
	getNamenlijstkrachten(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		const rol = this.route.snapshot.paramMap.get('rol');
		this.namenlijstkrachtService.getNamenlijstkrachten()
		.subscribe(namenlijstkrachten => this.namenlijstkrachten = namenlijstkrachten.filter(x => x.spel == id&&x.speler==this.spelspeler.speler&&x.rol==rol));
	}
	
	veranderDoelwit(index: number, doelwit: string): void {
		const rol = this.route.snapshot.paramMap.get('rol');
		this.namenlijstkrachten[index].doelwit=doelwit;
		if(index+1==this.namenlijstkrachten.length){
			const id = +this.route.snapshot.paramMap.get('id');
			let namenlijstkracht=new Namenlijstkracht(id,this.spelspeler.speler,rol);
			this.namenlijstkrachtService.addNamenlijstkracht(namenlijstkracht as Namenlijstkracht)
			.subscribe();
		}
		this.namenlijstkrachtService.updateNamenlijstkracht(this.namenlijstkrachten[index])
    .subscribe();
		this.getNamenlijstkrachten();
	}
	
	terug(): void {
    this.location.back();
  }
}
