import {Component, OnInit} from '@angular/core';
import {Store} from '../../kamaModel/Store';
import {StoreService} from '../../service/kamatcho/store.service';

@Component({
    selector: 'app-add-store',
    templateUrl: './add-store.component.html',
    styleUrls: ['./add-store.component.scss']
})
export class AddStoreComponent implements OnInit {

    store: Store;
    name: string;
    responsible: string;
    capacity: number;
    laltitude: number;
    longitude: number;
    availability: boolean;
    region: string;

    constructor(private apiStore: StoreService) {
    }

    ngOnInit(): void {

    }

    addStore(): void {
        this.apiStore.addStore(this.name, this.responsible, this.capacity, this.longitude, this.laltitude, this.availability, this.region);
    }

}
