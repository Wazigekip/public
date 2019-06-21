import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Spel } from '../spel';
import { SpelService } from '../spel.service';

import { Forumtopic } from '../forumtopic';
import { ForumtopicService } from '../forumtopic.service';

@Component({
  selector: 'app-normaal-spel-uitvoer-forumtopic',
  templateUrl: './normaal-spel-uitvoer-forumtopic.component.html',
  styleUrls: ['./normaal-spel-uitvoer-forumtopic.component.scss']
})
export class NormaalSpelUitvoerForumtopicComponent implements OnInit {
	spel: Spel;
	forumtopic: Forumtopic;

  constructor(
		private route: ActivatedRoute,
		private location: Location,
		private spelService: SpelService,
		private forumtopicService: ForumtopicService
	) { }

  ngOnInit() {
		
		this.getSpel();
		this.getForumtopic();
  }
	
	getSpel(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.spelService.getSpellen()
		.subscribe(spellen => this.spel = spellen.find(x => x.id == id));
	}

	getForumtopic(): void {
		const topic = +this.route.snapshot.paramMap.get('topic');
		this.forumtopicService.getForumtopics()
		.subscribe(forumtopics => this.forumtopic = forumtopics.find(x => x.id == topic));
	}
	
	copyInputMessage(inputElement){
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }

}
