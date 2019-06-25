import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Spelspeler } from './spelspeler';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class SpelspelerService {
  private spelspelerUrl = 'api/spelspelers';  // URL to web api

  constructor(
    private http: HttpClient) { }

	getSpelspelers (): Observable<Spelspeler[]> {
		return this.http.get<Spelspeler[]>(this.spelspelerUrl)
	}	

	addSpelspeler (spelspeler: Spelspeler): Observable<Spelspeler> {
    return this.http.post<Spelspeler>(this.spelspelerUrl, spelspeler, httpOptions)
  }
	
	updateSpelspeler (spelspeler: Spelspeler): Observable<any> {
    return this.http.put(this.spelspelerUrl, spelspeler, httpOptions)
  }
}