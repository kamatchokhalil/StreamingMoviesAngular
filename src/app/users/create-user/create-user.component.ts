import { UserServiceService } from './../../service/userServices/user-service.service';
import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { AuthServiceService } from 'app/service/auth-service.service';
import { Store } from 'app/kamaModel/Store';
@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
    username: String;
    email: string;
    name: string;
    password: string;
    role: string;
    lastName: string;
    birthday: Date;

   success : boolean = false ;
   error :  boolean = false;


    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private _userService :  UserServiceService
    )
    {
        // Configure the layout
      
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        console.log(localStorage.getItem('userinfo'));
    
    }

    onClickAddUser(){

        let user = 
            {
  "email": this.email,
  "password": this.password,
  "name": this.name,
  "lastName": this.lastName,

}




           this._userService.createUser(user).subscribe(
               resp =>  this.success = true,
               err =>  this.error = true

           )

    }

}
