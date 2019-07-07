import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Enkeldoelwitkracht } from './enkeldoelwitkracht';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class EnkeldoelwitkrachtService {
	private enkeldoelwitkrachtUrl = 'api/enkeldoelwitkrachten';  // URL to web api

  constructor(
    private http: HttpClient
	) { }
	
	getEnkeldoelwitkrachten (): Observable<Enkeldoelwitkracht[]> {
		return this.http.get<Enkeldoelwitkracht[]>(this.enkeldoelwitkrachtUrl)
	}	

	addEnkeldoelwitkracht (enkeldoelwitkracht: Enkeldoelwitkracht): Observable<Enkeldoelwitkracht> {
    return this.http.post<Enkeldoelwitkracht>(this.enkeldoelwitkrachtUrl, enkeldoelwitkracht, httpOptions)
  }
	
	updateEnkeldoelwitkracht (enkeldoelwitkracht: Enkeldoelwitkracht): Observable<any> {
    return this.http.put(this.enkeldoelwitkrachtUrl, enkeldoelwitkracht, httpOptions)
  }
}
