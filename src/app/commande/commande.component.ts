import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommandeService } from '../service/commande.service';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css']
})
export class CommandeComponent implements OnInit {



  cmd1;
  cmd:any = []
 
  constructor(private service:CommandeService,private router: ActivatedRoute) {
}
  ngOnInit(): void {
    this.service.getcmd().subscribe((data)=>{(this.cmd1=data['hydra:member'])});

  }
  

  onDelete(id:number){

    if(this.service.deletecmd(id)){

      this.service.getcmd().subscribe(( data:  any[])=>this.cmd1= data);

    }
  }

}
