import {Component, Input, OnInit} from '@angular/core';
import {MyComment} from '../../../../assets/model/MyComment.model';
import {ActionSheetService} from 'ng-zorro-antd-mobile';
import {DataService} from '../../../service/data.service';
import {User} from '../../../../assets/model/User.model';

@Component({
    selector: 'app-flw-com-block',
    templateUrl: './flw-com-block.component.html',
    styleUrls: ['./flw-com-block.component.scss'],
})
export class FlwComBlockComponent implements OnInit {

    @Input() curCom: MyComment;
    curUser: User;

    constructor(private _actionSheet: ActionSheetService,
                private dataService: DataService) {
    }

    ngOnInit() {

    }

    like() {

    }

    viewFollows(message) {

    }
}
