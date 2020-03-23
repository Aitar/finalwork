import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../assets/model/User.model';
import {DataService} from '../service/data.service';
import {Subscription} from 'rxjs';
import {NavController} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import {ActionSheetService} from 'ng-zorro-antd-mobile';

@Component({
    selector: 'app-user',
    templateUrl: './user.page.html',
    styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit, OnDestroy {
    curUser: User;
    userSub: Subscription;

    constructor(private dataService: DataService,
                private navCtrl: NavController,
                private route: ActivatedRoute,
                private _actionSheet: ActionSheetService) {
    }

    ngOnInit() {
        this.route.paramMap.subscribe(paramMap => {
            if (!paramMap.has('userId')) {
                //获取信息用户失败
                this.navCtrl.back();
                return;
            }

            this.userSub = this.dataService.getUser(paramMap.get('userId')).subscribe(user => {
                this.curUser = user
            });
        });

    }

    ngOnDestroy(): void {
        if (this.userSub)
            this.userSub.unsubscribe();
    }

    back() {
        this.navCtrl.back();
    }

    viewFollows(message) {
        const BUTTONS = ['取 消'];
        this._actionSheet.showActionSheetWithOptions(
            {
                options: BUTTONS,
                cancelButtonIndex: BUTTONS.length - 1,
                destructiveButtonIndex: BUTTONS.length - 2,
                message: message,
                maskClosable: true
            },
            buttonIndex => {
                console.log(buttonIndex);
            }
        );
    }
}
