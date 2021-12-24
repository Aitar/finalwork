import {Component, OnDestroy, OnInit} from '@angular/core';
import {MyComment} from '../../../../assets/model/MyComment.model';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {NavController} from '@ionic/angular';
import {CommentService} from '../../../service/comment.service';
import {User} from '../../../../assets/model/User.model';
import {AuthService} from '../../../service/auth.service';
import {serverUrl} from '../../../../assets/config';
import {FlwComment} from '../../../../assets/model/FlwComments.model';

@Component({
    selector: 'app-flw-com-page',
    templateUrl: './flw-com-page.page.html',
    styleUrls: ['./flw-com-page.page.scss'],
})
export class FlwComPagePage implements OnInit, OnDestroy {
    curCom: MyComment;
    comOwner: User;
    loadedFlwCom: FlwComment[] = [];
    comSub: Subscription;
    loading = false;
    self: boolean;
    isLiked: boolean;
    serverUrl: string = serverUrl;

    constructor(private commentService: CommentService,
                private router: ActivatedRoute,
                private navCtrl: NavController,
                private authService: AuthService) {
    }

    ngOnInit() {
        this.loading = true;
        this.router.paramMap.subscribe(paramMap => {
            if (!paramMap.has('cId')) {
                this.navCtrl.navigateBack(['/', 'psg', paramMap.get('psgId'), 'comment']);
                return;
            }
            this.comSub = this.commentService.getFlwComByTarId(paramMap.get('cId'))
                .subscribe(() => {
                    this.commentService.flwComments.subscribe(comments => {
                        this.loadedFlwCom = comments;
                        this.curCom = this.commentService.comTemp;
                        this.comOwner = this.commentService.comOwnerTemp;
                        this.self = this.comOwner.id == this.authService.curUser.id;
                        this.loading = false;
                        }
                    )
            })
        })

    }

    ngOnDestroy(): void {
        if (this.comSub)
            this.comSub.unsubscribe();
    }

    like() {

    }
}
