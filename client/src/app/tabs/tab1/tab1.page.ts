import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from '../../service/data.service';
import {Passage} from '../../../assets/model/Passage.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, OnDestroy{
  private loadPsgs: Passage[] = [];
  private psgSub: Subscription;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.psgSub = this.dataService.passages.subscribe( psgs =>
    this.loadPsgs = psgs
    );
  }

  ngOnDestroy(): void {
    if(this.psgSub)
      this.psgSub.unsubscribe();
  }




}
