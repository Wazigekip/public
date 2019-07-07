import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Berichtgebeurtenis } from './berichtgebeurtenis';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class BerichtgebeurtenisService {
	private berichtgebeurtenisUrl = 'api/berichtgebeurtenissen';  // URL to web api

  constructor(private http: HttpClient) { }
	
	getBerichtgebeurtenissen (): Observable<Berichtgebeurtenis[]> {
		return this.http.get<Berichtgebeurtenis[]>(this.berichtgebeurtenisUrl)
	}	
	
	addBerichtgebeurtenis (berichtgebeurtenis: Berichtgebeurtenis): Observable<Berichtgebeurtenis> {
    return this.http.post<Berichtgebeurtenis>(this.berichtgebeurtenisUrl, berichtgebeurtenis, httpOptions)
  }
}
