import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Passage} from '../../assets/model/Passage.model';
import {User} from '../../assets/model/User.model';
import {ActivatedRoute} from '@angular/router';
import {NavController} from '@ionic/angular';
import {DataService} from '../service/data.service';
import {ToastService} from 'ng-zorro-antd-mobile';
import {LikeMap} from '../../assets/model/LikeMap.model';
import {AuthService} from '../service/auth.service';

@Component({
    selector: 'app-psg',
    templateUrl: './psg.page.html',
    styleUrls: ['./psg.page.scss'],
})
export class PsgPage implements OnInit, OnDestroy {
    private psgSub: Subscription;
    private writerSub: Subscription;
    private comSub: Subscription;
    private curPsg: Passage;
    private writer: User;
    private curUser;
    private likeMap: LikeMap;
    isliked: boolean;
    isColleted: boolean = false;
    isFollowed: boolean = false;

    constructor(private router: ActivatedRoute,
                private navCtrl: NavController,
                private dataService: DataService,
                private authService: AuthService,
                private _toast: ToastService) {
    }

    ngOnInit() {
        this.curUser = this.authService.getCurUser();
        this.router.paramMap.subscribe(paramMap => {
            if (!paramMap.has('psgId')) {
                this.navCtrl.navigateBack(['/', 'tabs', 'tab1']);
                return;
            }

            let isTimeout: boolean = true;

            this._toast.loading('加载中', 10000);
            setTimeout(() => {
                this._toast.hide();
                if (isTimeout) {
                    this._toast.fail('加载超时！', 2000, () => {
                        this.navCtrl.navigateBack(['/', 'tabs', 'tab1']);
                        return;
                    });
                }
            }, 10000);

            //如果有passId则获取文章
            this.dataService.getPsg(paramMap.get('psgId')).subscribe(passage => {
                this.curPsg = passage;

                //成功获取文章后获取用户对章的点赞信息
                this.dataService.getLikeMapByPsgId(paramMap.get('psgId')).subscribe(likeMap => {
                    this.likeMap = likeMap;
                    if (this.likeMap) {
                        this.isliked = true;
                    }
                }, error => this.isliked = false);

                //成功获取文章后获取作者信息
                this.dataService.getUser(this.curPsg.userId).subscribe(user => {
                    this.writer = user;
                    this._toast.hide();
                    isTimeout = false;
                });
            });
        })
    }

    ngOnDestroy(): void {
        if (this.psgSub)
            this.psgSub.unsubscribe();
        if (this.writerSub)
            this.writerSub.unsubscribe();
    }

    like() {
        console.log(this.isliked);
        if (this.isliked) {
            this.dataService.undoLike(this.likeMap.id).subscribe(
                () => {
                    this.likeMap = null;
                    this.curPsg.likeNumber -= 1;
                }
            );
        } else
            this.dataService.like(this.curUser.userId, this.curPsg.psgId).subscribe(
                likeMap => {
                    this.likeMap = likeMap;
                    this.curPsg.likeNumber += 1;
                }
            );
        console.log(this.likeMap);
        this.isliked = !this.isliked;
    }

    collect() {
        this.isColleted = !this.isColleted;
    }

    follow() {
        this.isFollowed = !this.isFollowed;
    }
}
