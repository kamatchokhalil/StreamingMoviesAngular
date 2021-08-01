import {Component, Input, OnInit} from '@angular/core';
import {Film} from '../../kamaModel/Film';

@Component({
  selector: 'app-item-other',
  templateUrl: './item-other.component.html',
  styleUrls: ['./item-other.component.scss']
})
export class ItemOtherComponent implements OnInit {
    @Input() itemOfFilmsList: Film;

  constructor() { }

  ngOnInit(): void {
  }

}
