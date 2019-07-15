import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
		private http: HttpClient
	) { }
	
	addData (url: string, data: any): Observable<any> {
    return this.http.post<any>('api/'+url, data, httpOptions)
  }
	
	getData (url: string): Observable<any[]> {
		return this.http.get<any[]>('api/'+url)
	}	
	
	updateData (url: string, data: any): Observable<any> {
    return this.http.put('api/'+url, data, httpOptions)
  }
	
	deleteData (url: string, dataId: number): Observable<any> {
		return this.http.delete<any>(`api/${url}/${dataId}`, httpOptions);
  }
}
