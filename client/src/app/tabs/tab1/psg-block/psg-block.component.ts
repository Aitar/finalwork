import {Component, Input, OnInit} from '@angular/core';
import {Passage} from '../../../../assets/model/Passage.model';
import {Router} from '@angular/router';
import {DataService} from '../../../service/data.service';
import {User} from '../../../../assets/model/User.model';

@Component({
  selector: 'app-psg-block',
  templateUrl: './psg-block.component.html',
  styleUrls: ['./psg-block.component.scss'],
})
export class PsgBlockComponent implements OnInit {

  @Input() curPassage: Passage;
  curUser: User;

  constructor(private router: Router,
              private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getUser(this.curPassage.userId).subscribe(user => {
      this.curUser = user;
    });
  }

  jumpDetail() {
    this.router.navigate(['/', 'psg', this.curPassage.psgId]);
  }

}
