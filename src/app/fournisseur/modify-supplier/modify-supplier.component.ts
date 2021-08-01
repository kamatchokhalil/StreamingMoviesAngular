import { Component, OnInit } from '@angular/core';
import { SupplierServicesService } from '../../service/supplier-services.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-modify-supplier',
  templateUrl: './modify-supplier.component.html',
  styleUrls: ['./modify-supplier.component.scss']
})
export class ModifySupplierComponent implements OnInit {
  error :  boolean= false;
  id : number;
  data : any;

  constructor(private route: ActivatedRoute , private  supplierService: SupplierServicesService, private router: Router) { }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
   });
   this.supplierService.getSupplierById(this.id).subscribe( res => this.data = res ,  err => console.log(err))
  }

  saveModifcation(){
    let supplier = {
      'nomFournisseur': this.data.nomFournisseur,
      'adresse': this.data.adresse,
      'numTel': this.data.numTel,
      'email': this.data.email,
    }
    this.supplierService.modifySupplier(this.data.id, supplier).subscribe( 
      resp=>  this.router.navigate(['getsupplier']),
      erro => this.error = true
  )
  }
}
