import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Spelspeler } from '../spelspeler';
import { SpelspelerService } from '../spelspeler.service';

@Component({
  selector: 'app-rolkracht-invoer',
  templateUrl: './rolkracht-invoer.component.html',
  styleUrls: ['./rolkracht-invoer.component.scss']
})
export class RolkrachtInvoerComponent implements OnInit {
	spelspeler: Spelspeler;
	
  constructor(
		private route: ActivatedRoute,
		private location: Location,
		private spelspelerService: SpelspelerService,
	) {
		
	}

  ngOnInit() {
		this.getSpelspeler();
  }

	namenlijstkracht(): boolean{
		const rol = this.route.snapshot.paramMap.get('rol');
		if(rol=='jager'||rol=='burgemeester'){
			return true;
		}
		return false;
	}
	
	enkeldoelwitkracht(): boolean {
		const rol = this.route.snapshot.paramMap.get('rol');
		if(rol=='ziener'||rol=='huidenwisselaar'){
			return true;
		}
		return false;
	}
	
	getSpelspeler(): void {
		const speler = +this.route.snapshot.paramMap.get('speler');
		const rol = +this.route.snapshot.paramMap.get('rol');
		this.spelspelerService.getSpelspelers()
		.subscribe(spelspeler => this.spelspeler = spelspeler.find(x => x.id == speler));
		
	}
}
