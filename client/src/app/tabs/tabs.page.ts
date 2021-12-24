import {Component, OnInit} from '@angular/core';
import {AuthService} from '../service/auth.service';
import {User} from '../../assets/model/User.model';
import {PsgService} from '../service/psg.service';

@Component({
    selector: 'app-tabs',
    templateUrl: 'tabs.page.html',
    styleUrls: ['tabs.page.scss']
})
export class TabsPage {

    constructor(private psgService: PsgService,
                private authService: AuthService) {
    }


    reflush() {
        console.log()
        this.psgService.fetchPsgs(this.authService.curUser.id).subscribe();
    }
}
