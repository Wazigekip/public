import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-uitleg',
  templateUrl: './uitleg.component.html',
  styleUrls: ['./uitleg.component.scss']
})
export class UitlegComponent implements OnInit {

  constructor(
		private route: ActivatedRoute,
		private location: Location
	) { }

  ngOnInit() {
  }

	terug(): void {
    this.location.back();
  }
}
