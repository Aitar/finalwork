import {Component, OnInit} from '@angular/core';
import {User} from '../../../assets/model/User.model';
import {AuthService} from '../../service/auth.service';
import {Router} from '@angular/router';
import { serverUrl } from '../../../assets/config';
import {DataService} from '../../service/data.service';

@Component({
    selector: 'app-tab3',
    templateUrl: 'tab3.page.html',
    styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
    serverUrl = serverUrl;
    curUser: User;
    isLoading = false;

    constructor(private authService: AuthService,
                private dataService: DataService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.curUser = this.authService.curUser;
    }

    logout() {
        this.authService.logout();
    }
}
