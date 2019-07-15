import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sub-title',
  templateUrl: './sub-title.component.html',
  styleUrls: ['./sub-title.component.scss']
})
export class SubTitleComponent implements OnInit {
	@Input() subTitle: string;

  constructor() { }

  ngOnInit() {
  }

}
