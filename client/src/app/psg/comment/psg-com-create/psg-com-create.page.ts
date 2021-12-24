import {Component, OnInit} from '@angular/core';
import {ToastService} from 'ng-zorro-antd-mobile';
import {NavController} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import {DataService} from '../../../service/data.service';
import {Passage} from '../../../../assets/model/Passage.model';
import {User} from '../../../../assets/model/User.model';
import {MyComment} from '../../../../assets/model/MyComment.model';
import {AuthService} from '../../../service/auth.service';
import {PsgService} from '../../../service/psg.service';
import {UserService} from '../../../service/user.service';
import {CommentService} from '../../../service/comment.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
    selector: 'app-psg-com-create',
    templateUrl: './psg-com-create.page.html',
    styleUrls: ['./psg-com-create.page.scss'],
})

export class PsgComCreatePage implements OnInit {
    curPsg: Passage;
    tarUser: User;
    curUser: User;
    comContent: string;
    isloading = false;

    constructor(private _toast: ToastService,
                private navCtrl: NavController,
                private route: ActivatedRoute,
                private psgService: PsgService,
                private userService: UserService,
                private commentService: CommentService,
                private dataService: DataService,
                private authService: AuthService) {
    }

    ngOnInit() {
        this.isloading = true;
        this.curUser = this.authService.curUser;
        let isTimeout: boolean = true;
        this.route.paramMap.subscribe(paramMap => {
            console.log(paramMap);
            if (!paramMap.has('psgId')) {
                const toast = this._toast.fail('评论内容获取失败！', 2000, () => {
                    this.navCtrl.back();
                    return;
                })
            }

            this._toast.loading('加载中');
            setTimeout(() => {
                this._toast.hide();
                if (isTimeout) {
                    this._toast.fail('加载超时！', 1000, () => {
                        this.navCtrl.back();
                        return;
                    });
                }
            }, 10000);

            this.psgService.getPsg(paramMap.get('psgId')).subscribe(psg => {
                this.curPsg = psg;
                this.userService.getUser(this.curPsg.author).subscribe(user => {
                    this.tarUser = user;
                    console.log(user);
                    this._toast.hide();
                    isTimeout = false;
                    this.isloading = false;
                })
            })
        })
    }


    submitComment() {
        if (!this.comContent) {
            this._toast.fail('请写些东西再提交吧', 1000);
            return;
        }
        let com: MyComment = new MyComment();
        com.allArgs('com' + (new Date()).valueOf(),
            this.curUser.id,
            this.curPsg.id,
            this.comContent,
            this.dataService.formatIt(new Date(), 'YYYY-MM-DD'),
            0,
            0,
            0);
        console.log(com);
        this.commentService.insertCom(com).subscribe( massage => {
            console.log(massage);
            this._toast.success('评论成功', 1000, () => {
                this.navCtrl.back()
            });
            },
            (error: HttpErrorResponse) => {
                this._toast.fail('评论失败', 1000, () => {
                    this.navCtrl.back()
                })
            }
        );
    }

    back() {
        this.navCtrl.back();
    }
}
