import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Store} from '../../kamaModel/Store';
import {Film} from '../../kamaModel/Film';
import {Review} from '../../kamaModel/Review';

@Component({
    selector: 'app-item-comment',
    templateUrl: './item-comment.component.html',
    styleUrls: ['./item-comment.component.scss']
})
export class ItemCommentComponent implements OnInit {


    @Input() itemReviewList: Review;
    @Output() deleteReviewEvent = new EventEmitter<Review>();
    userId = 1;

    constructor() {
    }

    ngOnInit(): void {
    }

    delete(): void{
        this.deleteReviewEvent.emit(this.itemReviewList);
    }
}
