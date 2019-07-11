import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Speler } from './speler';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class SpelerService {
	private spelerUrl = 'api/spelers';  // URL to web api

  constructor(private http: HttpClient) { }
	
	getSpelers (): Observable<Speler[]> {
		return this.http.get<Speler[]>(this.spelerUrl);
	}	
	
	addSpeler (speler: Speler): Observable<Speler> {
    return this.http.post<Speler>(this.spelerUrl, speler, httpOptions);
  }
	
	deleteSpeler (speler: Speler): Observable<Speler> {
    return this.http.delete<Speler>(`${this.spelerUrl}/${speler.id}`, httpOptions);
  }
}
