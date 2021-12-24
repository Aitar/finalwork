import {Component, OnInit} from '@angular/core';
import {DataService} from '../../service/data.service';
import {MyComment} from '../../../assets/model/MyComment.model';
import {ActivatedRoute} from '@angular/router';
import {PsgService} from '../../service/psg.service';
import {UserService} from '../../service/user.service';
import {CommentService} from '../../service/comment.service';

@Component({
    selector: 'app-comment',
    templateUrl: './comment.page.html',
    styleUrls: ['./comment.page.scss'],
})
export class CommentPage implements OnInit {
    isLoading = false;
    loadedCom: MyComment[] = [];
    curPsgId: string;

    constructor(private dataService: DataService,
                private psgService: PsgService,
                private userService: UserService,
                private commentService: CommentService,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.isLoading = true;
        this.route.paramMap.subscribe(paramMap => {
            if(!paramMap.has('psgId'))
                return;

            this.curPsgId = paramMap.get('psgId');
            this.commentService.getComByPsgId(this.curPsgId).subscribe( comments => {
                this.loadedCom = comments;
                this.isLoading = false;
            })
        });
    }

}
