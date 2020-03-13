import { Component, OnInit } from '@angular/core';
import {ToastService} from 'ng-zorro-antd-mobile';
import {NavController} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import {DataService} from '../../../service/data.service';
import {MyComment} from '../../../../assets/model/MyComment.model';
import {User} from '../../../../assets/model/User.model';
import set = Reflect.set;

@Component({
  selector: 'app-comment-create',
  templateUrl: './comment-create.page.html',
  styleUrls: ['./comment-create.page.scss'],
})
export class CommentCreatePage implements OnInit {
  comContent: string;
  curCom: MyComment;
  curUser: User;

  constructor(private _toast: ToastService,
              private navCtrl: NavController,
              private route: ActivatedRoute,
              private dataService: DataService) { }

  ngOnInit() {
    let isTimeout: boolean = true;
    this.route.paramMap.subscribe( paramMap => {
      console.log(paramMap);
      if(!paramMap.has('cId')){
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

      this.dataService.getCom(paramMap.get('cId')).subscribe(comment => {
        this.curCom = comment;
        this.dataService.getUser(this.curCom.owner).subscribe( user => {
          this.curUser = user;
          console.log(user);
          this._toast.hide();
          isTimeout = false;
        }, error => {
          console.log(error);
        })
      }, error => {
        console.log(error);
      })
    });
  }

  submitComment() {
    const toast = this._toast.success('评论成功', 1000, () => {
      console.log('success');
      this.navCtrl.back();
      return;
    });
  }

  back() {
    this.navCtrl.back();
  }
}
