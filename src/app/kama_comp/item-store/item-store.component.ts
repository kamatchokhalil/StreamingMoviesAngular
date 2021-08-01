import {Component, EventEmitter, Input, OnInit, Output, Pipe} from '@angular/core';
import {StoreService} from '../../service/kamatcho/store.service';
import {Store} from '../../kamaModel/Store';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {PersoServiceService} from '../../service/kamatcho/perso-service.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-item-store',
    templateUrl: './item-store.component.html',
    styleUrls: ['./item-store.component.scss']
})

export class ItemStoreComponent implements OnInit {

    @Input() itemStore: Store;
    @Output() deleteStoreEvent = new EventEmitter<Store>();
    url: string;
    urlSafe: SafeResourceUrl;
    randomColor: string;
    urlImage: string;

    constructor(private router: Router, private sanitizer: DomSanitizer, private persoService: PersoServiceService) {
    }

    ngOnInit(): void {
        this.url = 'https://maps.google.com/maps?q=' + this.itemStore.longitude + ',' + this.itemStore.laltitude + '&hl=es;z=14&amp&output=embed'
        this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
        this.randomColor = this.persoService.getRandomColor();
        this.urlImage = 'http://placehold.it/110x110/' + this.randomColor + '/fff?text=Store';

    }

    deleteStore(): void{
        this.deleteStoreEvent.emit(this.itemStore);
    }

    editStore(store: Store): void{
        this.router.navigate(['/editStore', this.itemStore.id]);
    }

}
