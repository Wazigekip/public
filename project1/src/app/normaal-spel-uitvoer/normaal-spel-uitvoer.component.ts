import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Spel } from '../spel';
import { SpelService } from '../spel.service';

import { Dag } from '../dag';
import { DagService } from '../dag.service';

@Component({
  selector: 'app-normaal-spel-uitvoer',
  templateUrl: './normaal-spel-uitvoer.component.html',
  styleUrls: ['./normaal-spel-uitvoer.component.scss']
})
export class NormaalSpelUitvoerComponent implements OnInit {
	spel: Spel;
	dag: Dag;

  constructor(
		private route: ActivatedRoute,
		private location: Location,
		private spelService: SpelService,
		private dagService: DagService
	) { }

  ngOnInit() {
		
		this.getSpel();
		this.getDag();
  }
	
	getSpel(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.spelService.getSpellen()
		.subscribe(spellen => this.spel = spellen.find(x => x.id == id));
	}

	getDag(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		const dag = +this.route.snapshot.paramMap.get('dag');
		this.dagService.getDagen()
		.subscribe(dagen => this.dag = dagen.find(x => x.spel == id && x.dag == dag));
	}
	
	copyInputMessage(inputElement){
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }
}
