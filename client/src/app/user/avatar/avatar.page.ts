import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../../assets/model/User.model';
import {Subscription} from 'rxjs';
import {DataService} from '../../service/data.service';
import {NavController} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import {ActionSheetService} from 'ng-zorro-antd-mobile';
import {AuthService} from '../../service/auth.service';
import {serverUrl} from '../../../assets/config';

@Component({
    selector: 'app-avatar',
    templateUrl: './avatar.page.html',
    styleUrls: ['./avatar.page.scss'],
})
export class AvatarPage implements OnInit{
    curUser: User;
    serverUrl = serverUrl;
    isloading = true;

    constructor(private dataService: DataService,
                private authService: AuthService,
                private navCtrl: NavController,
                private route: ActivatedRoute,
                private _actionSheet: ActionSheetService) {
    }

    ngOnInit() {
        this.curUser = this.authService.curUser;
    }

    loaded(){
        this.isloading = !this.isloading;
    }
}
