import { Component, OnInit } from '@angular/core';

import { Spelleider } from '../spelleider';
import { SpelleiderService } from '../spelleider.service';

@Component({
  selector: 'app-inloggen',
  templateUrl: './inloggen.component.html',
  styleUrls: ['./inloggen.component.scss']
})
export class InloggenComponent implements OnInit {
	spelleiders: Spelleider[];
	spelleiderIndex: number;

  constructor(private spelleiderService: SpelleiderService) { }

  ngOnInit() {
		this.getSpelleiders();
  }
	
	veranderSpelleider(index: number): void {
		this.spelleiderIndex=index;
	}

	getSpelleiders(): void {
    this.spelleiderService.getSpelleiders()
    .subscribe(spelleiders => this.spelleiders = spelleiders);
		
		this.spelleiderService.getSpelleiders()
    .subscribe(spelleiders => this.spelleiderIndex = spelleiders[0].id);
  }
	
}
