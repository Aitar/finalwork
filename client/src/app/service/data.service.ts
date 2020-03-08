import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Passage} from '../../assets/model/Passage.model';
import {mockPassges} from '../../assets/mockData/mock-passages';
import {mockUsers} from '../../assets/mockData/mock-users';
import {User} from '../../assets/model/User.model';
import {map, take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private _passages = new BehaviorSubject<Passage[]>(mockPassges);
  private _users = new BehaviorSubject<User[]>(mockUsers);

  constructor() { }

  get users(){
    return this._users.asObservable();
  }

  get passages(){
    return this._passages.asObservable();
  }

  getPsg(id: string){
    return this.passages.pipe(
        take(1),
        map(passages => {
          return{...passages.find(p => p.passId == id)};
        })
    );
  }

  getUser(id: string){
    return this.users.pipe(
        take(1),
        map( users => {
          return {...users.find( u => u.userId == id)};
        })
    );
  }
}
