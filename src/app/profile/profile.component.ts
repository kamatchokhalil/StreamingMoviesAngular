import  jwt_decode  from 'jwt-decode';
import { UserServiceService } from './../service/userServices/user-service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    user :any;
  constructor(private _userSerivce : UserServiceService ,  private router : Router) { }

  ngOnInit(): void {

    let pay : any = jwt_decode(localStorage.getItem('userinfo'));
    console.log(pay );
    let email = pay.username;
    this._userSerivce.getUserByEmail(email).subscribe(
        resp=>this.user = resp.Account,
        err => console.log(err)
    )
 
  }


  
  editProfile(){
       
  
    this.router.navigate(['/editProfile'])
}

}
