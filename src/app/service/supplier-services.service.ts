import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SupplierServicesService {
  httpOptions = {
     headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer '+ localStorage.getItem('userinfo')
    })
  }
  constructor(private http: HttpClient) { }
  url = "https://localhost:8000";
  createSupplier(supplier: any) {


    return this.http.post<any>(this.url + '/api/fournisseurs', JSON.stringify(supplier), this.httpOptions);
  }

  getSuppliers(): Observable<any> {


    return this.http.get<any>(this.url + '/api/fournisseurs', this.httpOptions);

  }

  getSupplierById(id: number): Observable<any> {

    return this.http.get<any>(this.url + '/api/fournisseurs/' + id, this.httpOptions);
  }

  modifySupplier(id: number, supplier: any): Observable<any> {

    return this.http.put<any>(this.url + '/api/fournisseurs/' + id, supplier, this.httpOptions);
  }
  
  deleteSupplier(id: number): Observable<any> {

    return this.http.delete<any>(this.url + '/api/fournisseurs/' + id, this.httpOptions);
  }
}