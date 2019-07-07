import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Forumgebeurtenis } from './forumgebeurtenis';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ForumgebeurtenisService {
	private forumgebeurtenisUrl = 'api/forumgebeurtenissen';  // URL to web api

  constructor(private http: HttpClient) { }
	
	getForumgebeurtenissen (): Observable<Forumgebeurtenis[]> {
		return this.http.get<Forumgebeurtenis[]>(this.forumgebeurtenisUrl)
	}	
	
	addForumgebeurtenis (forumgebeurtenis: Forumgebeurtenis): Observable<Forumgebeurtenis> {
    return this.http.post<Forumgebeurtenis>(this.forumgebeurtenisUrl, forumgebeurtenis, httpOptions)
  }
}
