import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MarqueService } from '../service/marque.service';

@Component({
  selector: 'app-marque',
  templateUrl: './marque.component.html',
  styleUrls: ['./marque.component.css']
})
export class MarqueComponent implements OnInit {

  mq1;
  mq:any = []
 
  constructor(private service:MarqueService,private router: ActivatedRoute) {
}
  ngOnInit(): void {
    this.service.getmq().subscribe((data)=>{(this.mq1=data['hydra:member'])});

  }
  

  onDelete(id:number){

    if(this.service.deletemq(id)){

      this.service.getmq().subscribe(( data:  any[])=>this.mq1= data);

    }
  }

}
