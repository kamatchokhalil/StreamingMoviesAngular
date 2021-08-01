import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Categorie} from '../../kamaModel/Categorie';
import {Film} from '../../kamaModel/Film';

@Component({
    selector: 'app-item-category',
    templateUrl: './item-category.component.html',
    styleUrls: ['./item-category.component.scss']
})
export class ItemCategoryComponent implements OnInit {

    @Input() itemCategory: Categorie;


    constructor() {
    }

    ngOnInit(): void {
    }



}
