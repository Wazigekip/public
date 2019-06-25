import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Dag } from './dag';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DagService {
	private dagUrl = 'api/dagen';  // URL to web api

  constructor(
		private http: HttpClient
	) { }
	
	getDagen (): Observable<Dag[]> {
		return this.http.get<Dag[]>(this.dagUrl)
	}	
	
	addDag (dag: Dag): Observable<Dag> {
    return this.http.post<Dag>(this.dagUrl, dag, httpOptions)
  }
	
	updateDag (dag: Dag): Observable<any> {
    return this.http.put(this.dagUrl, dag, httpOptions)
  }
}
