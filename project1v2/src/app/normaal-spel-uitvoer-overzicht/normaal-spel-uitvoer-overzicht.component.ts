import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Spel } from '../spel';
import { SpelService } from '../spel.service';

import { Dag } from '../dag';
import { DagService } from '../dag.service';

@Component({
  selector: 'app-normaal-spel-uitvoer-overzicht',
  templateUrl: './normaal-spel-uitvoer-overzicht.component.html',
  styleUrls: ['./normaal-spel-uitvoer-overzicht.component.scss']
})
export class NormaalSpelUitvoerOverzichtComponent implements OnInit {
	spel: Spel;
	dagen: Dag[];

  constructor(
		private route: ActivatedRoute,
		private location: Location,
		private spelService: SpelService,
		private dagService: DagService
	) { }

  ngOnInit() {
		
		this.getSpel();
		this.getDagen();
  }
	
	getSpel(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.spelService.getSpellen()
		.subscribe(spellen => this.spel = spellen.find(x => x.id == id));
	}

	getDagen(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.dagService.getDagen()
		.subscribe(dagen => this.dagen = dagen.filter(x => x.spel == id  && x.dag < this.spel.dag));
	}

	add(lynch: string, lunch: string): void {
		const spel = +this.route.snapshot.paramMap.get('id');
    lynch = lynch.trim();
		lunch = lunch.trim();
		let dag = 3;
		
    if (!lynch) { return; }
    this.dagService.addDag({spel,dag,lynch,lunch} as Dag)
      .subscribe(dag => {
        this.dagen.push(dag);
      });
  }
}
