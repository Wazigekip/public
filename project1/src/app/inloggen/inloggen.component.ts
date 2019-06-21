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

  constructor(private spelleiderService: SpelleiderService) { }

  ngOnInit() {
		this.getSpelleiders();
  }

	getSpelleiders(): void {
    this.spelleiderService.getSpelleiders()
    .subscribe(spelleiders => this.spelleiders = spelleiders);
  }
}
