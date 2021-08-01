import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { product } from '../../model/produit';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  
  url="http://localhost:8000/api/produits/";
  constructor(private http:HttpClient) { }
  getproduct(){
    return this.http.get<any>(this.url);
  }
  
 

  postproduit(any): Observable<any> {
    return this.http.post<any>(this.url + '/produits', JSON.stringify(any), this.httpOptions); }  

    deleteproduit(id : number) : boolean{

      try{
        const productUrl = 'http://localhost:8000/api/produits/';
      this.http.delete(productUrl + id).subscribe();
      return true

      }catch(error){
        return false;
      }
    }
    getCurrentData(id: number) {
      const urlCa = 'http://localhost:8000/api/produits/';
      return this.http.get(urlCa  +  id);
    }
    updateser(id :number, data:any) {
      const urlC = 'http://localhost:8000/api/produits/';
      return this.http.put(urlC + id, data);
    }
    
}
