import {Component, Input, OnInit} from '@angular/core';
import {MyComment} from '../../../../assets/model/MyComment.model';
import {ActionSheetService} from 'ng-zorro-antd-mobile';

@Component({
  selector: 'app-flw-com-block',
  templateUrl: './flw-com-block.component.html',
  styleUrls: ['./flw-com-block.component.scss'],
})
export class FlwComBlockComponent implements OnInit {

  @Input() curCom: MyComment;

  constructor(private _actionSheet: ActionSheetService,) { }

  ngOnInit() {}

  like() {

  }

  viewFollows(message){

  }
}
