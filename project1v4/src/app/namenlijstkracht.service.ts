import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Namenlijstkracht } from './namenlijstkracht';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class NamenlijstkrachtService {
	private namenlijstkrachtUrl = 'api/namenlijstkrachten';  // URL to web api

  constructor(
    private http: HttpClient
	) { }
	
	getNamenlijstkrachten (): Observable<Namenlijstkracht[]> {
		return this.http.get<Namenlijstkracht[]>(this.namenlijstkrachtUrl)
	}	

	addNamenlijstkracht (namenlijstkracht: Namenlijstkracht): Observable<Namenlijstkracht> {
    return this.http.post<Namenlijstkracht>(this.namenlijstkrachtUrl, namenlijstkracht, httpOptions)
  }
	
	updateNamenlijstkracht (namenlijstkracht: Namenlijstkracht): Observable<any> {
    return this.http.put(this.namenlijstkrachtUrl, namenlijstkracht, httpOptions)
  }
}
