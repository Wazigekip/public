import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Variant } from './variant';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class VariantService {
  private variantUrl = 'api/varianten';  // URL to web api

  constructor(
    private http: HttpClient) { }

  /** GET heroes from the server */
	getVarianten (): Observable<Variant[]> {
		return this.http.get<Variant[]>(this.variantUrl)
	}	
	
	

}