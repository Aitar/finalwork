import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MyComment} from '../../../../assets/model/MyComment.model';
import {ActivatedRoute, Router} from '@angular/router';
import {NavController} from '@ionic/angular';
import {ActionSheetService, ToastService} from 'ng-zorro-antd-mobile';
import {User} from '../../../../assets/model/User.model';
import {DataService} from '../../../service/data.service';
import {PsgService} from '../../../service/psg.service';
import {UserService} from '../../../service/user.service';
import {serverUrl} from '../../../../assets/config';
import {AuthService} from '../../../service/auth.service';
import {CommentService} from '../../../service/comment.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
    selector: 'app-com-block',
    templateUrl: './com-block.component.html',
    styleUrls: ['./com-block.component.scss'],
})
export class ComBlockComponent implements OnInit {
    @Input() curCom: MyComment;
    isLiked: boolean = false;
    comOwner: User;
    curUser: User;
    self = false;
    serverUrl = serverUrl;

    constructor(private router: Router,
                private navCtrl: NavController,
                private actRouter: ActivatedRoute,
                private _actionSheet: ActionSheetService,
                private _tosas: ToastService,
                private psgService: PsgService,
                private userService: UserService,
                private authService: AuthService,
                private commentService: CommentService) {
    }

    ngOnInit() {
        this.curUser = this.authService.curUser;
        this.userService.getUser(this.curCom.owner).subscribe(user => {
            this.comOwner = user;
            this.commentService.comTemp = this.curCom;
            this.commentService.comOwnerTemp = this.comOwner;
            this.self = this.curUser.id == this.comOwner.id;
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

    delete() {
        this.commentService.deleteCom(this.curCom.id)
            .subscribe(
                massage => {
                        console.log(massage);
                        this._tosas.success('删除成功', 1000);
                    },(error: HttpErrorResponse) => {
                        this._tosas.fail('删除失败', 1000, () => {return;})
                    });
    }

}
