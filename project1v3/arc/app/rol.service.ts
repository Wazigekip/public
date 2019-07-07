import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Rol } from './rol';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class RolService {
	private rolUrl = 'api/rollen';  // URL to web api

  constructor(
    private http: HttpClient
	) { }

	getRollen (): Observable<Rol[]> {
		return this.http.get<Rol[]>(this.rolUrl)
	}	
}
