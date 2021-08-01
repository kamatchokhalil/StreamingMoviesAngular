import { UserServiceService } from './../../service/userServices/user-service.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common'
@Component({
  selector: 'app-modify-user',
  templateUrl: './modify-user.component.html',
  styleUrls: ['./modify-user.component.scss']
})
export class ModifyUserComponent implements OnInit {

    error :  boolean= false;
    id : number;
    data : any;
  constructor(private route: ActivatedRoute , private _userService : UserServiceService, public datepipe: DatePipe, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
        this.id = +params['id']; // (+) converts string 'id' to a number
 
        // In a real app: dispatch action to load the details here.
     });

this._userService.getUserById(this.id).subscribe( res =>{ 
    console.log(res);
    this.data = res; },  err => console.log(err))

  }


  onSaveModifcation(){
      let user = {
  
        "email": this.data.email,
        "name": this.data.name,
        "lastName":this.data.lastName,
        
      }

      this._userService.modifyUser(this.id,user).subscribe( 
          resp=>  this.router.navigate(['getUsers']),
          erro => this.error = true

      )
  }
}
