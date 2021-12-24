import {Component, OnInit} from '@angular/core';
import {ToastService} from 'ng-zorro-antd-mobile';
import {NavController} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import {DataService} from '../../../service/data.service';
import {MyComment} from '../../../../assets/model/MyComment.model';
import {User} from '../../../../assets/model/User.model';
import set = Reflect.set;
import {PsgService} from '../../../service/psg.service';
import {UserService} from '../../../service/user.service';
import {CommentService} from '../../../service/comment.service';
import {serverUrl} from '../../../../assets/config';
import {FlwComment} from '../../../../assets/model/FlwComments.model';
import {AuthService} from '../../../service/auth.service';

@Component({
    selector: 'app-comment-create',
    templateUrl: './comment-create.page.html',
    styleUrls: ['./comment-create.page.scss'],
})
export class CommentCreatePage implements OnInit {
    comContent: string;
    curCom: MyComment;
    tarUser: User;
    serverUrl = serverUrl;
    isloading = false;

    constructor(private _toast: ToastService,
                private navCtrl: NavController,
                private route: ActivatedRoute,
                private psgService: PsgService,
                private userService: UserService,
                private authService: AuthService,
                private dataService: DataService,
                private commentService: CommentService) {
    }

    ngOnInit() {
        this.isloading = true;
        let isTimeout: boolean = true;

        this.route.paramMap.subscribe(paramMap => {
            console.log(paramMap);
            if (!paramMap.has('cId')) {
                const toast = this._toast.fail('评论内容获取失败！', 1000, () => {
                    this.navCtrl.back();
                    return;
                })
            }

            this._toast.loading('加载中', 10000);
            setTimeout(() => {
                this._toast.hide();
                if (isTimeout) {
                    this._toast.fail('加载超时！', 1000, () => {
                        this.navCtrl.back();
                        return;
                    });
                }
            }, 1000);

            this.commentService.getComById(paramMap.get('cId')).subscribe(comment => {
                this.curCom = comment;
                this.userService.getUser(this.curCom.owner).subscribe(user => {
                    this.tarUser = user;
                    console.log(user);
                    this._toast.hide();
                    isTimeout = false;
                    this.isloading = false;
                }, error => {
                    console.log(error);
                })
            }, error => {
                console.log(error);
            })
        });
    }

    submitComment() {
        let id = 'flwcom' + (new Date()).valueOf();
        let flwCom: FlwComment = new FlwComment();
        flwCom.allArgs(
            id,
            this.authService.curUser.id,
            this.curCom.id,
            this.comContent,
            this.dataService.formatIt(new Date(), 'YYYY-MM-DD'),
            0
        );

        this._toast.loading('提交回复中', 10000);
        let timeout = true;
        setTimeout(()=>{
            if(timeout) {
                this._toast.hide();
                this._toast.fail('提交超时', 1000,
                    () => {
                    this.navCtrl.back();
                    return;
                });
            }
        }, 10000);

        this.commentService.insertFlwCom(flwCom).subscribe(()=>{
            timeout = false;
            this._toast.hide();
            this._toast.success('成功提交回复', 1000,
                () => {
                    this.curCom.followNum++;
                    this.navCtrl.back();
                    return;
            });
        }, error => {
            timeout = false;
            this._toast.hide();
            this._toast.fail('提交回复失败', 1000,
                () => {
                    this.navCtrl.back();
                    return;
                });
        });
    }

    back() {
        this.navCtrl.back();
    }
}
