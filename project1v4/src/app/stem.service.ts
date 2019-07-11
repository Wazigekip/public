import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Stem } from './stem';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class StemService {
	private stemUrl = 'api/stemmen';  // URL to web api

  constructor(
    private http: HttpClient) { }

	getStemmen (): Observable<Stem[]> {
		return this.http.get<Stem[]>(this.stemUrl)
	}	

	addStem (stem: Stem): Observable<Stem> {
    return this.http.post<Stem>(this.stemUrl, stem, httpOptions)
  }
	
	updateStem (stem: Stem): Observable<any> {
    return this.http.put(this.stemUrl, stem, httpOptions)
  }
	
}
