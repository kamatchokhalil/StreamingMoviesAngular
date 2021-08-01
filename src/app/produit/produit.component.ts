import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProduitService } from '../service/produit.service';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent implements OnInit {
  prod1;
  produit:any = []
  editprod= new FormGroup({
    label: new FormControl('')
  });
  constructor(private service:ProduitService,private router: ActivatedRoute) {
}
  @Input() prod = {id:0,label:'',prixunitaire:0,promotion:'',description:'',idmarque:0,idstock:0}
  ngOnInit(): void {
    this.service.getproduct().subscribe((data)=>{(this.prod1=data['hydra:member'])});

  }
  

  onDelete(id:number){

    if(this.service.deleteproduit(id)){

      this.service.getproduct().subscribe(( data:  any[])=>this.prod1= data);

    }
  }
  
}
