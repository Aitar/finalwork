import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MyComment} from '../../../../assets/model/MyComment.model';
import {ActivatedRoute, Router} from '@angular/router';
import {NavController} from '@ionic/angular';
import {ActionSheetService} from 'ng-zorro-antd-mobile';
import {User} from '../../../../assets/model/User.model';
import {DataService} from '../../../service/data.service';

@Component({
    selector: 'app-com-block',
    templateUrl: './com-block.component.html',
    styleUrls: ['./com-block.component.scss'],
})
export class ComBlockComponent implements OnInit {
    @Input() curCom: MyComment;
    isLiked: boolean = false;
    curUser: User;

    constructor(private router: Router,
                private navCtrl: NavController,
                private actRouter: ActivatedRoute,
                private _actionSheet: ActionSheetService,
                private dataService: DataService) {
    }

    ngOnInit() {
        this.dataService.getUser(this.curCom.owner).subscribe(user => {
            this.curUser = user;
        });
    }

    like() {
        console.log("click");
        this.isLiked = !this.isLiked;
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
