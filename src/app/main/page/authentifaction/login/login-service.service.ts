import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(httpClient:HttpClient ) { }

  Login(params:any) :  boolean {
    
      return true;
  }

  
}
