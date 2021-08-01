import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PersoServiceService {

    color: string;
    letters: any;

    constructor() {
    }

    // tslint:disable-next-line:typedef
    getRandomColor() {
         this.color = Math.floor(0x1000000 * Math.random()).toString(16);
         // return '#' + ('000000' + this.color).slice(-6);
         return ('000000' + this.color).slice(-6);
    }
}
