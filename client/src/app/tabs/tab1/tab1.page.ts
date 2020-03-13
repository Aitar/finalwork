import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from '../../service/data.service';
import {Passage} from '../../../assets/model/Passage.model';
import {Subscription} from 'rxjs';
import {ToastService} from 'ng-zorro-antd-mobile';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, OnDestroy{
  private loadPsgs: Passage[] = [];
  private psgSub: Subscription;
  searchValue: string;

  constructor(private dataService: DataService,
              private _toast: ToastService) {}

  ngOnInit(): void {
    let isTimeout: boolean = true;

    this._toast.loading('加载中',10000);
    setTimeout( () => {
      // this._toast.hide();
      if(isTimeout) {
        this._toast.fail('加载超时！', 2000, () => {
          return;
        });
      }
    }, 10000);

    this.psgSub = this.dataService.passages.subscribe( psgs =>{
      this.loadPsgs = psgs;
      this._toast.hide();
      isTimeout = false;
    });
  }

  ngOnDestroy(): void {
    if(this.psgSub)
      this.psgSub.unsubscribe();
  }

  submit(value) {
    console.log(value, 'onSubmit');
  }
}
