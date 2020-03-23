import {Injectable} from '@angular/core';
import {User} from '../../assets/model/User.model';
import {mockUsers} from '../../assets/mockData/mock-users';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    curUser: User = mockUsers[0];

    constructor() {
    }

    getCurUser() {
        return this.curUser;
    }
}
