import { Component, OnInit } from '@angular/core';
import {DataService} from '../../service/data.service';
import {MyComment} from '../../../assets/model/MyComment.model';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.page.html',
  styleUrls: ['./comment.page.scss'],
})
export class CommentPage implements OnInit {
  private loadedCom: MyComment[] = [];
  curPsgId: string;

  constructor(private dataService: DataService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe( paramMap => {
       this.curPsgId = paramMap.get('psgId');
    })
    this.dataService.comments.subscribe( comments=>
        this.loadedCom = comments
    )
  }

}
