import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Gebeurtenis } from './gebeurtenis';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class GebeurtenisService {
	private gebeurtenisUrl = 'api/gebeurtenissen';  // URL to web api

  constructor(private http: HttpClient) { }
	
	getGebeurtenissen (): Observable<Gebeurtenis[]> {
		return this.http.get<Gebeurtenis[]>(this.gebeurtenisUrl)
	}	
	
	addGebeurtenis (gebeurtenis: Gebeurtenis): Observable<Gebeurtenis> {
    return this.http.post<Gebeurtenis>(this.gebeurtenisUrl, gebeurtenis, httpOptions)
  }
}
