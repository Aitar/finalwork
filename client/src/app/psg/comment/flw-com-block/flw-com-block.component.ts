import {Component, Input, OnInit} from '@angular/core';
import {MyComment} from '../../../../assets/model/MyComment.model';
import {ActionSheetService} from 'ng-zorro-antd-mobile';
import {DataService} from '../../../service/data.service';
import {User} from '../../../../assets/model/User.model';
import {FlwComment} from '../../../../assets/model/FlwComments.model';
import {UserService} from '../../../service/user.service';
import {serverUrl} from '../../../../assets/config';
import {AuthService} from '../../../service/auth.service';

@Component({
    selector: 'app-flw-com-block',
    templateUrl: './flw-com-block.component.html',
    styleUrls: ['./flw-com-block.component.scss'],
})
export class FlwComBlockComponent implements OnInit {

    @Input() curFlwCom: FlwComment;
    curUser: User;
    self = false;
    serverUrl = serverUrl;
    loading: boolean = false;

    constructor(private _actionSheet: ActionSheetService,
                private userService: UserService,
                private authService: AuthService) {
    }

    ngOnInit() {
        this.loading = true;
        this.userService.getUser(this.curFlwCom.owner).subscribe((user: User) => {
            this.curUser = user;
            this.self = this.curUser.id == this.authService.curUser.id;
            this.loading = false;
        })
    }

    like() {

    }

    viewFollows(message) {

    }
}
