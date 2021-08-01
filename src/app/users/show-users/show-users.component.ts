import { UserServiceService } from './../../service/userServices/user-service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-users',
  templateUrl: './show-users.component.html',
  styleUrls: ['./show-users.component.scss']
})
export class ShowUsersComponent implements OnInit {

data :any[] ;
  constructor( private _userService: UserServiceService ,  private router: Router) { }

  ngOnInit(): void {

    this._userService.getUsers().subscribe(res => {
        console.log(res)
        this.data = res['hydra:member']

    }
      , err => console.log(err))
  }

  onClickModifyUser(id:number){

    this.router.navigate(['user',id] );
  }






}
