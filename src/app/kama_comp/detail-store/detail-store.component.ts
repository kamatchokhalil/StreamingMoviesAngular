import {Component, OnInit} from '@angular/core';
import {StoreService} from '../../service/kamatcho/store.service';
import {Store} from '../../kamaModel/Store';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-detail-store',
    templateUrl: './detail-store.component.html',
    styleUrls: ['./detail-store.component.scss']
})
export class DetailStoreComponent implements OnInit {

    constructor(private apiStore: StoreService, private route: ActivatedRoute, private router: Router) {
    }

    currentId: number;
    toggle: boolean;
    checked = true;
    itemStore: Store;

/*    name: string;
    responsible: string;
    capacity: number;
    laltitude: number;
    longitude: number;
    availability: boolean;
    region: string;*/

    ngOnInit(): void {

        this.currentId = this.route.snapshot.params.id;

        this.apiStore.getStoreById(this.currentId).subscribe(
            (data) => {
                this.itemStore = data;
                this.getStoreById(data);
            }
        );

        console.log('ss', this.itemStore);

    }

    getStoreById(data: Store): void {

        this.itemStore = data;
        console.log('sssss', this.itemStore);

    }


    editeStore(): void {
        this.apiStore.editStore(this.itemStore).subscribe(
            (success) => {
                this.router.navigate(['/stores']);
            },
            (error) => {
                console.log('error', error);
            }
        );
    }

}
