import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer '+ localStorage.getItem('userinfo')
        })
      }  
  constructor(private http:HttpClient) { }
  url="https://localhost:8000";
  createUser (user:any){


    return this.http.post<any>(this.url + '/registration', JSON.stringify(user), this.httpOptions); 
  }

  getUsers() : Observable<any>{

    console.log(this.httpOptions);

    return this.http.get<any>(this.url + '/api/user_as',this.httpOptions);

  }

  getUserById(id :number): Observable<any>{


    return this.http.get<any>(this.url + '/api/user_as/'+id , this.httpOptions);
  }

  modifyUser(id:number , user:any) : Observable<any>{

    return this.http.put<any>(this.url + '/api/user_as/'+id, user ,this.httpOptions);
  }

  getUserByEmail(email : string){
    return this.http.post<any>(this.url + '/api/userByEmail', JSON.stringify({'email' : email}), this.httpOptions); 

  }

  ChangePassword(userCred : any){

    return this.http.post<any>(this.url + '/api/changePassword', JSON.stringify(userCred), this.httpOptions); 

  }
}
