import {Component, Input, OnInit} from '@angular/core';
import {Passage} from '../../../../assets/model/Passage.model';
import {User} from '../../../../assets/model/User.model';
import {ModalService, ToastService} from 'ng-zorro-antd-mobile';
import {PsgService} from '../../../service/psg.service';
import {UserService} from '../../../service/user.service';
import {ActivatedRoute} from '@angular/router';
import {serverUrl} from '../../../../assets/config';
import {DataService} from '../../../service/data.service';
import {AuthService} from '../../../service/auth.service';
import {CollectMap} from '../../../../assets/model/CollectMap.model';

@Component({
  selector: 'app-psg-block',
  templateUrl: './psg-block.component.html',
  styleUrls: ['./psg-block.component.scss'],
})
export class PsgBlockComponent implements OnInit {
  @Input() psg: Passage;
  writer:User;
  isLoading = false;
  isCollected = true;
  serverUrl: string = serverUrl;

  constructor(private _modal: ModalService,
              private _toast: ToastService,
              private psgService: PsgService,
              private userService: UserService,
              private dataService: DataService,
              private authService: AuthService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.isLoading = true;
    this.userService.getUser(this.psg.author).subscribe(user => {
      this.writer = user;
      this.isLoading = false;
    })
  }

  undoCollect(){
    this.isCollected = false;

    let isTimeout = true;
    setTimeout(() => {
      this._toast.hide();
      if (isTimeout) {
        this._toast.fail('加载超时，请检查网络连接', 1000, () => {
          return;
        });
      }
    }, 10000);

    this.dataService.undoCollectByTwo(this.authService.curUser.id, this.psg.id)
        .subscribe(()=>{
            isTimeout = false;
            this._toast.hide();
          },error => {
            this.isCollected = true;
            isTimeout = false;
            this._toast.hide();
            this._toast.fail('取消收藏失败', 1000);
        })
  }

  collect(){
    this.isCollected = true;
    let generateId = ((new Date()).valueOf() / 1000 + '').substring(0, 10);
    let collect = new CollectMap();
    collect.allArgs(generateId, this.authService.curUser.id, this.psg.id);
    let isTimeout = true;
    setTimeout(() => {
      this._toast.hide();
      if (isTimeout) {
        this._toast.fail('加载超时，请检查网络连接', 1000, () => {
          return;
        });
      }
    }, 10000);

    this.dataService.collect(collect).subscribe(()=>{
      isTimeout = false;
      this._toast.hide();
    }, error => {
      this.isCollected = false;
      isTimeout = false;
      this._toast.hide();
      this._toast.fail('收藏失败', 1000);
    })
  }
}
