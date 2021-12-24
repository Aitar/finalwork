import {Component, Input, OnInit} from '@angular/core';
import {Passage} from '../../../../assets/model/Passage.model';
import {Router} from '@angular/router';
import {DataService} from '../../../service/data.service';
import {User} from '../../../../assets/model/User.model';
import {UserService} from '../../../service/user.service';
import {serverUrl} from '../../../../assets/config';
import {PsgService} from '../../../service/psg.service';

@Component({
    selector: 'app-psg-block',
    templateUrl: './psg-block.component.html',
    styleUrls: ['./psg-block.component.scss'],
})
export class PsgBlockComponent implements OnInit {

    @Input() curPassage: Passage;
    isLoading = false;
    writer: User;
    serverUrl: string = serverUrl;

    constructor(private router: Router,
                private userService: UserService,
                private psgService: PsgService) {
    }

    ngOnInit() {
        this.isLoading = true;
        this.psgService.formLikeAndCommentsNum(this.curPassage);
        this.userService.getUser(this.curPassage.author).subscribe(user => {
            this.writer = user;
            this.isLoading = false;
        });
    }

    jumpDetail() {
        this.router.navigate(['/', 'psg', this.curPassage.id]);
    }


    jumpToUserPage() {
        this.router.navigate(['/', 'user', this.writer.id]);
    }
}
