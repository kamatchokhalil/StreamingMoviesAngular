import { Component, OnInit } from '@angular/core';
import {Store} from '../../kamaModel/Store';
import {StoreService} from '../../service/kamatcho/store.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-all-store',
  templateUrl: './all-store.component.html',
  styleUrls: ['./all-store.component.scss']
})
export class AllStoreComponent implements OnInit {
    storesList: Store[];
  constructor(private router: Router, private apiStore: StoreService ) { }

  ngOnInit(): void {
      this.apiStore.getAllStores().subscribe(
          (data: Store[]) => { this.storesList = data; }
      );
  }

    deleteStore(store): void{
        const r = confirm('Do you want to delete this store ?');
        if (r === true){
            this.apiStore.deleteStore(store.id).subscribe(
                (data) => {
                    console.log('from delete film', data);
                    this.router.navigate(['/stores']);
                    window.location.href = 'http://localhost:4200/stores';
                },
                (error => {  console.log('error', error); })
            );
        }
    }

}
