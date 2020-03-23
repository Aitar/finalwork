import {Component, OnInit} from '@angular/core';
import {ToastService} from 'ng-zorro-antd-mobile';
import {NavController} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import {DataService} from '../../../service/data.service';
import {Passage} from '../../../../assets/model/Passage.model';
import {User} from '../../../../assets/model/User.model';
import {MyComment} from '../../../../assets/model/MyComment.model';
import {AuthService} from '../../../service/auth.service';
import {mockComments} from '../../../../assets/mockData/mock-comments';

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

    constructor(private _toast: ToastService,
                private navCtrl: NavController,
                private route: ActivatedRoute,
                private dataService: DataService,
                private authService: AuthService) {
    }

    ngOnInit() {
        this.curUser = this.authService.getCurUser();
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
                    this._toast.fail('加载超时！', 2000, () => {
                        this.navCtrl.back();
                        return;
                    });
                }
            }, 1000);

            this.dataService.getPsg(paramMap.get('psgId')).subscribe(psg => {
                this.curPsg = psg;
                this.dataService.getUser(this.curPsg.userId).subscribe(user => {
                    this.tarUser = user;
                    console.log(user);
                    this._toast.hide();
                    isTimeout = false;
                })
            })
        })
    }


    submitComment() {
        if (!this.comContent) {
            this._toast.fail('无法提交空评论', 1000);
            return;
        }
        mockComments.push(
            new MyComment(
                'com' + (new Date()).valueOf(),
                this.curUser.userId,
                this.curPsg.psgId,
                this.comContent,
                this.dataService.getLocalTime(new Date().getTime()),
                0,
                0,
                0
            ));
        this._toast.success('评论成功', 1000, () => {
            this.navCtrl.back()
        });
        console.log((new Date()).valueOf());
    }

    back() {
        this.navCtrl.back();
    }
}
