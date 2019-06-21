import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Spel } from '../spel';
import { SpelService } from '../spel.service';

import { Forumtopic } from '../forumtopic';
import { ForumtopicService } from '../forumtopic.service';

@Component({
  selector: 'app-normaal-spel-uitvoer-begin',
  templateUrl: './normaal-spel-uitvoer-begin.component.html',
  styleUrls: ['./normaal-spel-uitvoer-begin.component.scss']
})
export class NormaalSpelUitvoerBeginComponent implements OnInit {
	spel: Spel;
	forumtopics: Forumtopic[];

  constructor(
		private route: ActivatedRoute,
		private location: Location,
		private spelService: SpelService,
		private forumtopicService: ForumtopicService
	) { }

  ngOnInit() {
		
		this.getSpel();
		this.getForumtopics();
  }
	
	getSpel(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.spelService.getSpellen()
		.subscribe(spellen => this.spel = spellen.find(x => x.id == id));
	}

	getForumtopics(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.forumtopicService.getForumtopics()
		.subscribe(forumtopics => this.forumtopics = forumtopics.filter(x => x.variant == this.spel.variant));
	}

}
