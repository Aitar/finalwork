import { Component, OnInit } from '@angular/core';
import {DataService} from '../../service/data.service';
import {User} from '../../../assets/model/User.model';
import {mockUsers} from '../../../assets/mockData/mock-users';

@Component({
  selector: 'app-flws',
  templateUrl: './flws.page.html',
  styleUrls: ['./flws.page.scss'],
})
export class FlwsPage implements OnInit {
  loadedUsers: User[] = [];

  constructor() { }

  ngOnInit() {
    this.loadedUsers = mockUsers;
  }

    leave() {

    }
}
