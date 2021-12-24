import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Passage} from '../../assets/model/Passage.model';
import {User} from '../../assets/model/User.model';
import {ActivatedRoute, Router} from '@angular/router';
import {NavController} from '@ionic/angular';
import {DataService} from '../service/data.service';
import {ToastService} from 'ng-zorro-antd-mobile';
import {LikeMap} from '../../assets/model/LikeMap.model';
import {AuthService} from '../service/auth.service';
import {serverUrl} from '../../assets/config';
import {UserService} from '../service/user.service';
import {PsgService} from '../service/psg.service';
import {FlwMap} from '../../assets/model/FlwMap.model';
import {CollectMap} from '../../assets/model/CollectMap.model';
import {Trace} from '../../assets/model/Trace.model';

@Component({
    selector: 'app-psg',
    templateUrl: './psg.page.html',
    styleUrls: ['./psg.page.scss'],
})
export class PsgPage implements OnInit, OnDestroy {
    private psgSub: Subscription;
    private writerSub: Subscription;
    private curPsg: Passage;
    private writer: User;
    private curUser: User;
    private likeMap: LikeMap;
    private collectMap: CollectMap = new CollectMap();
    isLoading = false;
    isliked: boolean;
    isColleted: boolean = false;
    isFollowed: boolean = false;
    flwId: string = null;
    isSelf = false;
    serverUrl = serverUrl;
    rate: number = 3.0;
    recsLoading = false;
    recsPsgs: Passage[] = [];

    constructor(private router: ActivatedRoute,
                private navCtrl: NavController,
                private dataService: DataService,
                private userService: UserService,
                private psgService: PsgService,
                private authService: AuthService,
                private route: Router,
                private _toast: ToastService) {}

    ngOnInit() {
        this.isLoading = true;
        this.recsLoading = true;
        this.curUser = this.authService.curUser;
        this.router.paramMap.subscribe(paramMap => {
            //检查路径中是否有文章id
            if (!paramMap.has('psgId')) {
                this.navCtrl.navigateBack(['/', 'tabs', 'tab1']);
                return;
            }

            let isTimeout: boolean = true;
            this._toast.loading('加载中', 10000);
            setTimeout(() => {
                this._toast.hide();
                if (isTimeout) {
                    this._toast.fail('加载超时！', 1000, () => {
                        this.navCtrl.navigateBack(['/', 'tabs', 'tab1']);
                        return;
                    });
                }
            }, 10000);

            //如果有passId则获取文章
            this.psgService.getPsg(paramMap.get('psgId')).subscribe(passage => {
                this.curPsg = passage;
                console.log(this.curPsg);
                //成功获取文章后获取用户对文章的点赞信息
                this.dataService.likeMaps.subscribe(likeMaps => {
                    for(let i = 0; i < likeMaps.length; i++){
                        if(this.curPsg.id == likeMaps[i].pid){
                            this.isliked = true;
                            this.rate += 1.0;
                            this.likeMap = likeMaps[i];
                            break;
                        }
                    }
                });

                //成功获取文章后获取作者信息
                this.userService.getUser(this.curPsg.author).subscribe(user => {
                    this.writer = user;
                    this.isSelf = this.writer.id == this.curUser.id;
                    //若作者不是自己，获取对文章作者的关注信息
                    if(!this.isSelf){
                        let flwMaps: FlwMap[] = [];
                        this.dataService.flwerMaps.subscribe(data => {
                            flwMaps = data;
                            for(let flwMap of flwMaps){
                                if(flwMap.followed == this.writer.id){
                                    this.isFollowed = true;
                                    this.flwId = flwMap.id;
                                }
                            }
                        });
                    }
                    this.postViewTrace();
                    //获取收藏信息
                    this.dataService.isCollected(this.curUser.id, this.curPsg.id)
                        .subscribe(
                            (massage:{'massage': string})=> {
                                this.isColleted = true;
                                this.rate += 1.0;
                                this.collectMap.allArgs(massage.massage, this.curUser.id, this.curPsg.id);
                                this._toast.hide();
                                isTimeout = false;
                                this.isLoading = false;
                            },error => {
                                this.isColleted = false;
                                this._toast.hide();
                                isTimeout = false;
                                this.isLoading = false;
                            });
                    //获取文章推荐
                    this.psgService.getPsgRecs(this.curPsg.id).subscribe((psgs) => {
                        this.recsPsgs = psgs;
                        this.recsLoading = false;
                        console.log(this.recsPsgs);
                    });
                });
            });
        })
    }

    like() {
        console.log(this.isliked);
        if (this.isliked) {
            this.dataService.undoLike(this.likeMap).subscribe(
                (massage) => {
                        this.dataService.getLikeMapByUId(this.likeMap.uid).subscribe(()=>{
                            this.dataService.likeMaps.subscribe( like => {
                            console.log(like);
                        });
                    });
                    this.likeMap = null;
                    this.curPsg.liked -= 1;
                    this.rate--;
                }
            );
        } else {
            let likeMap = new LikeMap();
            let generateId = ((new Date()).valueOf() / 1000 + '').substring(0, 10);
            likeMap.allArgs(generateId, this.curUser.id, this.curPsg.id);
            this.dataService.like(likeMap).subscribe(
                msg => {
                    this.curPsg.liked += 1;
                }
            );
        }
        this.isliked = !this.isliked;
    }

    collect() {
        this.isColleted = !this.isColleted;

        let isTimeout = true;
        setTimeout(() => {
            this._toast.hide();
            if (isTimeout) {
                this._toast.fail('网络超时', 1000, () => {
                    this.isColleted = !this.isColleted;
                    return;
                });
            }
        }, 10000);

        if(this.isColleted){
            let generateId = ((new Date()).valueOf() / 1000 + '').substring(0, 10);
            let collect = new CollectMap();
            collect.allArgs(generateId, this.curUser.id, this.curPsg.id);
            this.dataService.collect(collect).subscribe(()=>{
                this.collectMap = collect;
                isTimeout = false;
                this.authService.curUser.collectNum++;
                this.rate++;
            },error => {
                this.isColleted = !this.isColleted;
                this._toast.fail('收藏失败', 1000);
                isTimeout = false;
            })
        }else{
            this.dataService.undoCollect(this.collectMap.id).subscribe(()=> {
                this.collectMap = null;
                isTimeout = false;
                this.rate--;
                this.authService.curUser.collectNum--;
            }, error => {
                this._toast.fail('取消收藏失败', 1000);
                isTimeout = false;
                this.isColleted = !this.isColleted;
            })
        }

    }

    follow() {
        this.isFollowed = !this.isFollowed;
        let isTimeout = true;
        setTimeout(() => {
            this._toast.hide();
            if (isTimeout) {
                this._toast.fail('网络超时', 1000, () => {
                    this.isFollowed = !this.isFollowed;
                    return;
                });
            }
        }, 10000);

        if(this.isFollowed){
            let generateId = ((new Date()).valueOf() / 1000 + '').substring(0, 10);
            this.dataService.follow(generateId, this.writer.id).subscribe( ()=> {
                isTimeout = false;
                this.flwId = generateId;
                this.authService.curUser.follows++;
            },error => {
                isTimeout = false;
                this.isFollowed = !this.isFollowed;
                this._toast.fail('关注失败', 1000);
            })
        }else {
            this.dataService.undoFollow(this.flwId).subscribe(() => {
                isTimeout = false;
                this.authService.curUser.follows--;
            },error => {
                isTimeout = false;
                this.isFollowed = !this.isFollowed;
                this._toast.fail('取关失败', 1000);
            })
        }
    }

    postViewTrace(){
        if(!this.dataService.isTrace) return;
        let id = ((new Date()).valueOf() / 1000 + '').substring(0, 10);
        let trace: Trace = new Trace();
        trace.allArgs(id, this.curUser.id, this.curPsg.id, this.dataService.formatIt(new Date(), 'YYYY-MM-DD HH:mm'));
        this.dataService.postTrace(trace).subscribe();
    }

    ngOnDestroy(){
        if (this.psgSub)
            this.psgSub.unsubscribe();
        if (this.writerSub)
            this.writerSub.unsubscribe();
    }

    ionViewWillLeave(){
        this.dataService.postRate(this.authService.curUser.id, this.curPsg.id, this.rate);
    }

    jumpToUserPage() {
        this.route.navigate(['/', 'user', this.writer.id]);
    }
}
