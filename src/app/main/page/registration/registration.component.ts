import { AuthServiceService } from '../../../service/auth-service.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap ,RouterLink} from '@angular/router';
import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { observeOn } from 'rxjs/operators';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class RegistrationComponent implements OnInit {
    loginForm: FormGroup;
    errorMessage : boolean = false;
    errorMessage2 : boolean = false;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private _authService :  AuthServiceService,
        private router: Router
    )
    {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar   : {
                    hidden: true
                },
                toolbar  : {
                    hidden: true
                },
                footer   : {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.loginForm = this._formBuilder.group({
            email   : ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            Name : ['', Validators.required],
            lastName : ['', Validators.required],
            conPassword : ['', Validators.required]
        });
    
    }

    onClickOnLogin(){


        if(this.loginForm.controls['password'].value !== this.loginForm.controls['conPassword'].value){
            this.errorMessage2 = true;
            return;
        }
        let user = 
            {
  "email": this.loginForm.controls['email'].value,
  "password": this.loginForm.controls['password'].value,
  "name": this.loginForm.controls['Name'].value,
  "lastName": this.loginForm.controls['lastName'].value,

}




        

            this._authService.regiser(user).subscribe(
            (res : any) => {
                let conUser  : any = {

                    email : this.loginForm.controls['email'].value,
                    password : this.loginForm.controls['password'].value
                };
                this._authService.connect(conUser).subscribe(
                    res=>{
                    localStorage.setItem('userinfo' , res.token)
                    console.log(res);
                    this.router.navigate(['analytics']);
                }
                )
                
            },
            err => {
                console.log(err);
                this.errorMessage = true;},
            () => console.log('HTTP request completed.')
            
            );

    }
}
