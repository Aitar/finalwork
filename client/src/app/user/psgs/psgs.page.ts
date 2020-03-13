import { Component, OnInit } from '@angular/core';
import {Passage} from '../../../assets/model/Passage.model';
import {mockPassges} from '../../../assets/mockData/mock-passages';

@Component({
  selector: 'app-psgs',
  templateUrl: './psgs.page.html',
  styleUrls: ['./psgs.page.scss'],
})
export class PsgsPage implements OnInit {
  loadedPsgs: Passage[] = [];

  constructor() { }

  ngOnInit() {
    this.loadedPsgs = mockPassges;
  }

  flag = true;
  index = 1;

  onChange(item) {
    console.log('onChange', item);
  }

  onTabClick(item) {
    console.log('onTabClick', item);
  }

  selectCard(e) {
    console.log(' ', JSON.stringify(e));
  }

  changeIndex() {
    this.index = 0;
  }

}
