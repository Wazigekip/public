import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Gebeurtenis } from '../gebeurtenis';
import { GebeurtenisService } from '../gebeurtenis.service';

@Component({
  selector: 'app-dodentopic-uitvoer',
  templateUrl: './dodentopic-uitvoer.component.html',
  styleUrls: ['./dodentopic-uitvoer.component.scss']
})
export class DodentopicUitvoerComponent implements OnInit {
	gebeurtenissen: Gebeurtenis[];
	dag: number;
	id: number;
	
  constructor(
		private route: ActivatedRoute,
		private location: Location,
		private gebeurtenisService: GebeurtenisService
	) { }

  ngOnInit() {
		this.getGebeurtenissen();
		this.getDag();
		this.getId();
  }
	
	getId(): void {
		this.id= +this.route.snapshot.paramMap.get('id');
	}
	
	getDag(): void {
		this.dag= +this.route.snapshot.paramMap.get('dag');
	}
	
	getGebeurtenissen(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		const dag = +this.route.snapshot.paramMap.get('dag');
		this.gebeurtenisService.getGebeurtenissen()
		.subscribe(gebeurtenissen => this.gebeurtenissen = gebeurtenissen.filter(x => x.spel == id && x.dag == dag));
	}
	
	copyInputMessage(containerid,index){
    var range = document.createRange();
    range.selectNode(document.getElementById(containerid));
    window.getSelection().removeAllRanges();
		window.getSelection().addRange(range);
    document.execCommand("copy");
  }
	
	terug(): void {
    this.location.back();
  }
}
