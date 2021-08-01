import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  constructor(private http:HttpClient) { }


  url="http://localhost:8000/api/commandes/";
  getcmd(){
    return this.http.get<any>(this.url);
  }
  

    deletecmd(id : number) : boolean{

      try{
        const productUrl = 'http://localhost:8000/api/commandes/';
      this.http.delete(productUrl + id).subscribe();
      return true

      }catch(error){
        return false;
      }
    
}
}