import { Component } from '@angular/core';
import {ToastService} from 'ng-zorro-antd-mobile';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  online: boolean = true;
  psgTitle: string;
  psgContent: string;

  constructor(private toast: ToastService) {}

  publish() {
  //提交审核
    this.toast.success('成功提交！请等待审核结果', 1000);

    if(false){
      this.toast.fail('网络连接失败！', 1000);
    }
  }

  autoSave(){
    this.online = !this.online;
    if(this.online){
      this.toast.success('自动保存成功！', 1000);
    }else {
      this.toast.fail('自动保存失败！请检查网络连接',1000);
    }
  }

  save(){
    //保存成功
    this.toast.success('保存成功！', 1000);

    if(false){
      this.toast.fail('保存失败！请检查网络连接',1000);
    }
  }
}
