import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-normaal-spel-uitvoer-dagoverzicht',
  templateUrl: './normaal-spel-uitvoer-dagoverzicht.component.html',
  styleUrls: ['./normaal-spel-uitvoer-dagoverzicht.component.scss']
})
export class NormaalSpelUitvoerDagoverzichtComponent implements OnInit {

  constructor(
		private route: ActivatedRoute,
		private location: Location
	) { }
	
	getdag(): number {
		const dag = +this.route.snapshot.paramMap.get('dag');
		return dag;
	}
	
	getid(): number {
		const id = +this.route.snapshot.paramMap.get('id');
		return id;
	}
	
	getRouterlinkspeltopic(): string {
		const dag = +this.route.snapshot.paramMap.get('dag');
		const id = +this.route.snapshot.paramMap.get('id');
		return '/normaaluitvoer/'+id+'/'+dag;
	}
	
	getRouterlinkrolberichten(): string {
		const dag = +this.route.snapshot.paramMap.get('dag');
		const id = +this.route.snapshot.paramMap.get('id');
		return '/rolberichtenuitvoer/'+id+'/'+dag;
	}

  ngOnInit() {
  }

	terug(): void {
    this.location.back();
  }
}
