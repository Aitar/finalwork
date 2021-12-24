import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-style-choose',
    templateUrl: './style-choose.component.html',
    styleUrls: ['./style-choose.component.scss'],
})
export class StyleChooseComponent implements OnInit {
    isStreet = false;
    isHouse = false;
    isBusiness = false;
    isHybird = false;
    isKorea = false;

    isOther = false;

    constructor() {
    }

    ngOnInit() {
    }



    business() {
      this.isBusiness = !this.isBusiness;
    }

    hybird() {
      this.isHybird = !this.isHybird;
    }

    korea() {
      this.isKorea = !this.isKorea;
    }

    house() {
      this.isHouse = !this.isHouse;
    }

    street() {
        this.isStreet = !this.isStreet;
    }

    other() {
      this.isOther = !this.isOther;
    }
}
