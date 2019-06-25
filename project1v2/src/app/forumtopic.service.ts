import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Forumtopic } from './forumtopic';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ForumtopicService {
	private forumtopicUrl = 'api/forumtopics';  // URL to web api

  constructor(private http: HttpClient) { }
	
	getForumtopics (): Observable<Forumtopic[]> {
		return this.http.get<Forumtopic[]>(this.forumtopicUrl)
	}
	
}
