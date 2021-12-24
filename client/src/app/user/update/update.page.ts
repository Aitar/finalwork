import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {ActionSheetService, ModalService, ToastService} from 'ng-zorro-antd-mobile';
import {User} from '../../../assets/model/User.model';
import {AuthService} from '../../service/auth.service';
import {UserService} from '../../service/user.service';

@Component({
    selector: 'app-update',
    templateUrl: './update.page.html',
    styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {

    private curUser: User;
    seasons = ['男', '女', '保密'];
    gender;
    birthday = null;
    value = new Date();

    constructor(private navCtrl: NavController,
                private authService: AuthService,
                private userService: UserService,
                private _modal: ModalService,
                private _actionSheet: ActionSheetService,
                private _toast: ToastService) {
    }

    ngOnInit() {
        this.curUser = this.authService.curUser;
        if(this.curUser.birthday)
            this.birthday = this.curUser.birthday;
        console.log(this.curUser);
        this.value = this.stringToDate(this.curUser.birthday);
    }


    showActionSheet = message => {
        const BUTTONS = ['取消'];
        this._actionSheet.showActionSheetWithOptions(
            {
                options: BUTTONS,
                cancelButtonIndex: BUTTONS.length - 1,
                message: message,
                maskClosable: true
            },
            buttonIndex => {
                console.log(buttonIndex);
            }
        );
    };

    back() {
        console.log('back');
        this._modal.alert('返回', '修改未保存，确定离开吗?', [
            {text: '取消'},
            {
                text: '确定',
                onPress: () => this.navCtrl.back(),
                style: {
                    color: '#000000',
                    background: '#ffffff'
                }
            }
        ])
    }

    avatarChange() {

    }

    saveGender() {
        this.curUser.gender = this.gender[0];
        console.log(this.curUser.gender);
    }




    currentDateFormat(date, format: string = 'yyyy-mm-dd HH:MM'): any {
        const pad = (n: number): string => (n < 10 ? `0${n}` : n.toString());
        return format
            .replace('yyyy', date.getFullYear())
            .replace('mm', pad(date.getMonth() + 1))
            .replace('dd', pad(date.getDate()))
            .replace('HH', pad(date.getHours()))
            .replace('MM', pad(date.getMinutes()))
            .replace('ss', pad(date.getSeconds()));
    }

    onOk(result: Date) {
        this.value = result;
    }

    formatIt(date: Date, form: string) {
        const pad = (n: number) => (n < 10 ? `0${n}` : n);
        const dateStr = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
        const timeStr = `${pad(date.getHours())}:${pad(date.getMinutes())}`;
        if (form === 'YYYY-MM-DD') {
            return dateStr;
        }
        if (form === 'HH:mm') {
            return timeStr;
        }
        return `${dateStr} ${timeStr}`;
    }

    stringToDate(str){
        let dateStrs = str.split("-");
        let year = parseInt(dateStrs[0], 10);
        let month = parseInt(dateStrs[1], 10) - 1;
        let day = parseInt(dateStrs[2], 10);
        return new Date(year, month, day);
    }


    submit() {
        this.curUser.birthday = this.formatIt(this.value, 'YYYY-MM-DD');
        let isTimeout: boolean = true;
        this._toast.loading("修改中...", 10000);

        setTimeout(() => {
            this._toast.hide();
            if (isTimeout) {
                this._toast.fail('加载超时，请检查网络连接', 1000, () => {
                    return;
                });
            }
        }, 10000);
        this.userService.updateUser(this.curUser).subscribe(()=>{
            isTimeout = false;
            this._toast.hide();
            this.authService.curUser = this.curUser;
            this._toast.success('修改成功', 1000, () => {
                this.navCtrl.back();
                return;
            })
        },error => {
            isTimeout = false;
            this._toast.hide();
            this._toast.fail('修改失败', 1000, () => {
                return;
            });
        });
    }
}
