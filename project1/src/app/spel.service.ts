import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Spel } from './spel';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class SpelService {
  private spelUrl = 'api/spellen';  // URL to web api

  constructor(
    private http: HttpClient) { }

	getSpellen (): Observable<Spel[]> {
		return this.http.get<Spel[]>(this.spelUrl)
	}	
	
	updateSpel (spel: Spel): Observable<any> {
    return this.http.put(this.spelUrl, spel, httpOptions)
  }

}