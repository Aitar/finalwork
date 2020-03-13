import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../../assets/model/User.model';
import {Subscription} from 'rxjs';
import {DataService} from '../../service/data.service';
import {NavController} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import {ActionSheetService} from 'ng-zorro-antd-mobile';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.page.html',
  styleUrls: ['./avatar.page.scss'],
})
export class AvatarPage implements OnInit, OnDestroy{
  curUser: User;
  userSub: Subscription;

  constructor(private dataService: DataService,
              private navCtrl: NavController,
              private route: ActivatedRoute,
              private _actionSheet: ActionSheetService) { }

  ngOnInit() {
    this.route.paramMap.subscribe( paramMap => {
      if(!paramMap.has('userId')){
        //获取信息用户失败
        this.navCtrl.back();
        return;
      }

      this.userSub = this.dataService.getUser(paramMap.get('userId')).subscribe( user =>{
        this.curUser = user
      });
    });

  }

  ngOnDestroy(): void {
    if(this.userSub)
      this.userSub.unsubscribe();
  }
}
