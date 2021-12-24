import {Component, Input, OnInit} from '@angular/core';
import {Passage} from '../../../assets/model/Passage.model';
import {User} from '../../../assets/model/User.model';
import {Router} from '@angular/router';
import {UserService} from '../../service/user.service';
import {PsgService} from '../../service/psg.service';
import {serverUrl} from '../../../assets/config';

@Component({
  selector: 'app-psg-card',
  templateUrl: './psg-card.component.html',
  styleUrls: ['./psg-card.component.scss'],
})
export class PsgCardComponent implements OnInit {

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
