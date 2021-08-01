import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }  
  constructor(private http:HttpClient) { }
  url="https://localhost:8000";

  connect(user:any): Observable<any>{
    return this.http.post<any>(this.url + '/api/login', JSON.stringify(user), this.httpOptions); 
 
  }

  regiser(user:any) : Observable<any>{
    return this.http.post<any>(this.url + '/registration', JSON.stringify(user), this.httpOptions); 
 

  }

}
