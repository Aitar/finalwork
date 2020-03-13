import { Component, OnInit } from '@angular/core';
import {ToastService} from 'ng-zorro-antd-mobile';
import {NavController} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import {DataService} from '../../../service/data.service';
import {Passage} from '../../../../assets/model/Passage.model';
import {User} from '../../../../assets/model/User.model';

@Component({
  selector: 'app-psg-com-create',
  templateUrl: './psg-com-create.page.html',
  styleUrls: ['./psg-com-create.page.scss'],
})
export class PsgComCreatePage implements OnInit {
  curPsg: Passage;
  tarUser: User;

  constructor(private _toast: ToastService,
              private navCtrl: NavController,
              private route: ActivatedRoute,
              private dataService: DataService) { }

  ngOnInit() {
    let isTimeout: boolean = true;
    this.route.paramMap.subscribe( paramMap => {
      console.log(paramMap);
      if(!paramMap.has('psgId')){
        const toast = this._toast.fail('评论内容获取失败！', 2000, ()=>{
          this.navCtrl.back();
          return;
        })
      }

      this._toast.loading('加载中');
      setTimeout( () => {
        this._toast.hide();
        if(isTimeout) {
          this._toast.fail('加载超时！', 2000, () => {
            this.navCtrl.back();
            return;
          });
        }
      }, 1000);

      this.dataService.getPsg(paramMap.get('psgId')).subscribe(psg => {
        this.curPsg = psg;
        this.dataService.getUser(this.curPsg.userId).subscribe( user => {
          this.tarUser = user;
          console.log(user);
          this._toast.hide();
          isTimeout = false;
        })
      })
    })
  }

  submitComment() {

  }

  back() {
    this.navCtrl.back();
  }
}
