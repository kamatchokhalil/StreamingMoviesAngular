import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MarqueService {

  constructor(private http:HttpClient) { }


  url="http://localhost:8000/api/marques/";
  getmq(){
    return this.http.get<any>(this.url);
  }
  

    deletemq(id : number) : boolean{

      try{
        const productUrl = 'http://localhost:8000/api/marques/';
      this.http.delete(productUrl + id).subscribe();
      return true

      }catch(error){
        return false;
      }
    
}
}
