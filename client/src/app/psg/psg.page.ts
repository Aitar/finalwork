import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Passage} from '../../assets/model/Passage.model';
import {User} from '../../assets/model/User.model';
import {ActivatedRoute} from '@angular/router';
import {NavController} from '@ionic/angular';
import {DataService} from '../service/data.service';
import {ToastService} from 'ng-zorro-antd-mobile';

@Component({
  selector: 'app-psg',
  templateUrl: './psg.page.html',
  styleUrls: ['./psg.page.scss'],
})
export class PsgPage implements OnInit, OnDestroy{
  private psgSub: Subscription;
  private userSub: Subscription;
  private comSub: Subscription;
  private curPsg: Passage;
  private curUser: User;
  isliked: boolean = false;
  isColleted: boolean = false;
  isFollowed: boolean = false;

  constructor(private router: ActivatedRoute,
              private navCtrl: NavController,
              private dataService: DataService,
              private _toast: ToastService) { }

  ngOnInit() {
    this.router.paramMap.subscribe( paramMap => {

      if(!paramMap.has('psgId')){
        this.navCtrl.navigateBack(['/', 'tabs', 'tab1']);
        return;
      }

      let isTimeout: boolean = true;

      this._toast.loading('加载中',10000);
      setTimeout( () => {
        this._toast.hide();
        if(isTimeout) {
          this._toast.fail('加载超时！', 2000, () => {
            this.navCtrl.navigateBack(['/', 'tabs', 'tab1']);
            return;
          });
        }
      }, 10000);

      //如果有passId则获取文章并且获取成功后获取用户
      this.dataService.getPsg(paramMap.get('psgId')).subscribe( passage => {
        this.curPsg = passage;
        this.dataService.getUser(this.curPsg.userId).subscribe( user => {
          this.curUser = user;
          this._toast.hide();
          isTimeout = false;
        });
      });
    })
  }

  ngOnDestroy(): void {
    if(this.psgSub)
      this.psgSub.unsubscribe();
    if(this.userSub)
      this.userSub.unsubscribe();
  }

  like() {
    this.isliked = !this.isliked;
  }

  collect() {
    this.isColleted = !this.isColleted;
  }

  follow() {
    this.isFollowed = !this.isFollowed;
  }
}
