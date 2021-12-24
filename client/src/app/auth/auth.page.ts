import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../service/auth.service';
import {UserService} from '../service/user.service';
import {ModalService, ToastService} from 'ng-zorro-antd-mobile';
import {NavController} from '@ionic/angular';
import {HttpErrorResponse} from '@angular/common/http';
import {DataService} from '../service/data.service';
import {Router} from '@angular/router';
import {serverUrl} from '../../assets/config';


@Component({
    selector: 'app-auth',
    templateUrl: './auth.page.html',
    styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
    isLogin: boolean = true;
    email = '593729747@qq.com';
    password = 'huang980518';
    url = serverUrl;
    constructor(private authService: AuthService,
                private userService: UserService,
                private dataService: DataService,
                private navCtrl: NavController,
                private route: Router,
                private _toast: ToastService,
                private _modal: ModalService,) {}

    ngOnInit() {

    }

    slideOpts = {
    };

    login(email: string, password: string) {
        let isTimeout: boolean = true;
        this._toast.loading("登录中...", 10000);

        setTimeout(() => {
            this._toast.hide();
            if (isTimeout) {
                this._toast.fail('加载超时，请检查网络连接', 1000, () => {
                    return;
                });
            }
        }, 10000);

        let time = this.dataService.formatIt(new Date(), 'YYYY-MM-DD HH:mm');
        this.authService.varify(email, password, time).subscribe(
            massage => {
                //获取用户信息
               this.userService.getUser(massage.massage).subscribe(
                   user => {
                       isTimeout = false;
                       this._toast.hide();
                       this.authService.curUser = user;
                       this.dataService.isTrace = user.point == 0;
                       //获取用户关注与粉丝信息
                       this.dataService.getFlwMapByFlwed(this.authService.curUser.id).subscribe(() => {
                           this.dataService.getFlwMapByFlwer(this.authService.curUser.id).subscribe(() => {
                           })
                       });

                       //获取用户点赞信息
                       this.dataService.getLikeMapByUId(user.id).subscribe( () => {
                           this.dataService.likeMaps.subscribe();
                           this.authService.userIsAuth = true;
                           // if(user.loginTime == 0){
                               this.route.navigateByUrl("/welcome");
                           // }else {
                           //     this.navCtrl.navigateForward('tabs/tab1');
                           // }
                       })
                   });
            },error => {
                isTimeout = false;
                this._toast.hide();
                this._toast.fail('用户名或密码错误', 1000, () => {
                    return;
                });
            });
    }

    register(email: string, password: string, nickName:string) {
        let isTimeout: boolean = true;

        this._toast.loading("注册中...");
        setTimeout(() => {
            this._toast.hide();
            if (isTimeout) {
                this._toast.fail('加载超时，请检查网络连接', 1000, () => {
                    return;
                });
            }
        }, 10000);

        this.userService.insertUser(nickName, email, password).subscribe(
            massage => {
                this._toast.hide();
                isTimeout = false;
                this._modal.alert('成功注册', '注册成功，是否直接登录？', [
                    { text: '否', onPress: () => {return;} },
                    { text: '是', onPress: () => {
                            this.userService.getUser(massage.massage).subscribe(
                                user => {
                                    this.authService.curUser = user;
                                    this.login(user.email, user.password);
                                }
                            );
                        }}
                ]);
            },
            (error: HttpErrorResponse) => {
                this._toast.hide();
                isTimeout = false;
                if(error.error.message.indexOf('Duplicate') != -1){
                    this._toast.fail("重复的昵称或者邮箱", 1000, ()=> {
                        return;
                    })
                }else {
                    this._toast.fail("注册失败，请重试", 1000, ()=> {
                        return;
                    })
                }
            }
        );
    }

    submit(form: NgForm) {
        if(!form.valid)
            return;
        let email = form.value.email;
        let password = form.value.password;
        if (this.isLogin){
            this.login(email, password);
        } else {
            let nickname = form.value.nickname;
            this.register(email, password, nickname);
        }
    }
}
