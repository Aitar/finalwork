import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import {ModalService} from 'ng-zorro-antd-mobile';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {

  constructor(private navCtrl: NavController,
              private _modal: ModalService) { }

  ngOnInit() {
    console.log('back');
  }

  back() {
    console.log('back');
    this._modal.alert('返回', '修改未保存，确定离开吗?', [
      { text: '取消'},
      { text: '确定',
        onPress: () => this.navCtrl.back(),
        style: {
          color: '#000000',
          background: '#ffffff'
        }
      }
    ])
  }
}
