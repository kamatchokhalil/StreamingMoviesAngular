import { SupplierServicesService } from '../../service/supplier-services.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-supplier',
  templateUrl: './show-supplier.component.html',
  styleUrls: ['./show-supplier.component.scss']
})
export class ShowSupplierComponent implements OnInit {
  error :  boolean= false;
  id : number;
  data :any[] ;
  constructor( private supplierService: SupplierServicesService ,  private router: Router) { }

  ngOnInit(): void {
    this.supplierService.getSuppliers().subscribe(res => 
      this.data = res['hydra:member'], err => console.log(err))
  }

  modifySupplier(id:number){
    this.router.navigate(['supplier',id] );
  }


  deleteSupplier(id:number) {
    console.log(id)
    this.supplierService.deleteSupplier(id).subscribe(
      resp=>  this.router.navigate(['getsupplier']),
      erro => this.error = true
    );
  }

}
