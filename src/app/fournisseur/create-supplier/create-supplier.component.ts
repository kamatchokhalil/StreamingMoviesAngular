import { SupplierServicesService } from '../../service/supplier-services.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FuseConfigService } from '@fuse/services/config.service';

@Component({
  selector: 'app-create-supplier',
  templateUrl: './create-supplier.component.html',
  styleUrls: ['./create-supplier.component.scss']
})
export class CreateSupplierComponent implements OnInit {
  supplier_name: String;
  address: string;
  number: string;
  email: string;

  success: boolean = false;
  error: boolean = false;
  /**
 * Constructor
 *
 * @param {FuseConfigService} _fuseConfigService
 * @param {FormBuilder} _formBuilder
 */
  constructor(
    private _fuseConfigService: FuseConfigService,
    private _formBuilder: FormBuilder,
    private supplierService: SupplierServicesService
  ) {

  }

  ngOnInit(): void {
  }

  addSupplier() {
    let supplier = {
      'nomFournisseur': this.supplier_name,
      'adresse': this.address,
      'numTel': this.number,
      'email': this.email,
    }
    this.supplierService.createSupplier(supplier).subscribe(
      resp =>  this.success = true,
      err =>  this.error = true
  )
  }
}
