import  jwt_decode from 'jwt-decode';
import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'app/service/userServices/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-profile',
  templateUrl: './show-profile.component.html',
  styleUrls: ['./show-profile.component.scss']
})
export class ShowProfileComponent implements OnInit {


    user :any;
    Changepassword :any ={
        password:  '',
        confirmPassword: ''


    }
    isTheSamePassowrd : boolean = false;
    IsDisbale :boolean = true;
  constructor(private _userSerivce : UserServiceService , private _router : Router) { }

  ngOnInit(): void {

    let pay : any = jwt_decode(localStorage.getItem('userinfo'));
    console.log(pay );
    let email = pay.username;
    this._userSerivce.getUserByEmail(email).subscribe(
        resp=>this.user = resp.Account,
        err => console.log(err)
    )
 
  }


  onUpdateProfile(){
    let user = {
  
        'email' : this.user.email,
        'name' : this.user.Name,

        "lastName":  this.user.lastName,
        
      }
    this.isTheSamePassowrd = false;

    if(this.Changepassword.password){

        if(this.Changepassword.password !==this.Changepassword.confirmPassword){

            this.isTheSamePassowrd = true;
            return
        }

        this._userSerivce.ChangePassword({
            'email' : this.user.email , 
            'password' : this.Changepassword.password
        }).subscribe( )
      

        this._userSerivce.modifyUser(this.user.id , user).subscribe(
            resp => this._router.navigate(['/profile'])
        )
      
    }else{

        this._userSerivce.modifyUser(this.user.id , user).subscribe(
            resp=>this._router.navigate(['/profile'])
        )
    }
  }


 
}
