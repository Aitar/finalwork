import {Component, OnInit} from '@angular/core';
import {User} from '../../../assets/model/User.model';
import {AuthService} from '../../service/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{


  curUser: User;

  constructor(private authService: AuthService,
              private router: Router) {}

  ngOnInit(): void {
    this.curUser = this.authService.getCurUser();
  }

  logout() {

  }
}
