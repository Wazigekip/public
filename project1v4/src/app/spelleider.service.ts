import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Spelleider } from './spelleider';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class SpelleiderService {
  private spelleiderUrl = 'api/spelleiders';  // URL to web api

  constructor(
    private http: HttpClient) { }

	getSpelleiders (): Observable<Spelleider[]> {
		return this.http.get<Spelleider[]>(this.spelleiderUrl)
	}	

}