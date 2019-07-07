import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Spelspeler } from '../spelspeler';
import { SpelspelerService } from '../spelspeler.service';

import { Enkeldoelwitkracht } from '../enkeldoelwitkracht';
import { EnkeldoelwitkrachtService } from '../enkeldoelwitkracht.service';

@Component({
  selector: 'app-enkeldoelwitkracht-invoer',
  templateUrl: './enkeldoelwitkracht-invoer.component.html',
  styleUrls: ['./enkeldoelwitkracht-invoer.component.scss']
})
export class EnkeldoelwitkrachtInvoerComponent implements OnInit {
	spelspeler: Spelspeler;
	spelspelers: Spelspeler[];
	enkeldoelwitkracht: Enkeldoelwitkracht;

  constructor(
		private route: ActivatedRoute,
		private location: Location,
		private spelspelerService: SpelspelerService,
		private enkeldoelwitkrachtService: EnkeldoelwitkrachtService
	) { }

  ngOnInit() {
		this.getSpelspeler();
		this.getSpelspelers();
		this.getEnkeldoelwitkracht();
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
	
	getEnkeldoelwitkracht(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		const rol = this.route.snapshot.paramMap.get('rol');
		const dag = +this.route.snapshot.paramMap.get('dag');
		this.enkeldoelwitkrachtService.getEnkeldoelwitkrachten()
		.subscribe(enkeldoelwitkrachten => this.enkeldoelwitkracht = enkeldoelwitkrachten.find(x => x.spel == id && x.speler == this.spelspeler.speler && x.rol == rol && x.dag == dag));
	}
	
	veranderDoelwit(doelwit: string): void {
		if(this.enkeldoelwitkracht){
			this.enkeldoelwitkracht.doelwit=doelwit;
			this.enkeldoelwitkrachtService.updateEnkeldoelwitkracht(this.enkeldoelwitkracht)
			.subscribe();
		}else{
			const id = +this.route.snapshot.paramMap.get('id');
			const dag = +this.route.snapshot.paramMap.get('dag');
			const rol = this.route.snapshot.paramMap.get('rol');
			let enkeldoelwitkracht=new Enkeldoelwitkracht(id,dag,this.spelspeler.speler,rol,doelwit);
			this.enkeldoelwitkrachtService.addEnkeldoelwitkracht(enkeldoelwitkracht as Enkeldoelwitkracht)
			.subscribe();
		}
		this.getEnkeldoelwitkracht();
	}
	
	getRol(): string {
		const rol = this.route.snapshot.paramMap.get('rol');
		return rol;
	}

	terug(): void {
    this.location.back();
  }
}
