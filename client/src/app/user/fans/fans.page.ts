import { Component, OnInit } from '@angular/core';
import {User} from '../../../assets/model/User.model';
import {mockUsers} from '../../../assets/mockData/mock-users';

@Component({
  selector: 'app-fans',
  templateUrl: './fans.page.html',
  styleUrls: ['./fans.page.scss'],
})
export class FansPage implements OnInit {
  loadedUsers: User[] = [];
  constructor() { }

  ngOnInit() {
    this.loadedUsers = mockUsers;
  }

  leave() {

  }

  follow() {

  }
}
