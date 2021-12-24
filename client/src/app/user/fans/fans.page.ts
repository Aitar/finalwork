import {Component, OnInit} from '@angular/core';
import {User} from '../../../assets/model/User.model';
import {mockUsers} from '../../../assets/mockData/mock-users';
import {UserService} from '../../service/user.service';
import {serverUrl} from '../../../assets/config';
import {HttpClient} from '@angular/common/http';
import {DataService} from '../../service/data.service';
import {AuthService} from '../../service/auth.service';
import {ToastService} from 'ng-zorro-antd-mobile';

@Component({
    selector: 'app-fans',
    templateUrl: './fans.page.html',
    styleUrls: ['./fans.page.scss'],
})
export class FansPage implements OnInit {
    loadedUsers: User[] = [];
    isLoading = false;
    serverUrl: string = serverUrl;

    constructor(private userService: UserService,
                private http: HttpClient,
                private dataService: DataService,
                private authService: AuthService,
                private _toast: ToastService) {
    }

    ngOnInit() {
        this.isLoading = true;
        this.userService.getFans().subscribe(() => {
            this.userService.fans.subscribe(fans => {
                this.loadedUsers = fans;
                this.isLoading = false;
            })
        })
    }

    leave(user: User) {
        user.email = null;
        let isTimeout = true;
        setTimeout(() => {
            this._toast.hide();
            if (isTimeout) {
                this._toast.fail('网络超时', 1000, () => {
                    return;
                });
            }
        }, 10000);

        this.http.post(
            `${serverUrl}/flw/delete`,
            {'follower': this.authService.curUser.id, 'followed' : user.id})
            .subscribe(() => {
                isTimeout = false;
                this.authService.curUser.follows--;
            },error => {
                isTimeout = false;
                this._toast.fail('取关失败', 1000);
            })

    }

    follow(user: User) {
        user.email = 'yse';

        let isTimeout = true;
        setTimeout(() => {
            this._toast.hide();
            if (isTimeout) {
                this._toast.fail('网络超时', 1000, () => {
                    return;
                });
            }
        }, 10000);

        let generateId = ((new Date()).valueOf() / 1000 + '').substring(0, 10);
        this.dataService.follow(generateId, user.id).subscribe( ()=> {
            isTimeout = false;
            this.authService.curUser.follows++;
        },error => {
            isTimeout = false;
            this._toast.fail('关注失败', 1000);
        })
    }
}
