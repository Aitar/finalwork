import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Passage} from '../../assets/model/Passage.model';
import {mockPassges} from '../../assets/mockData/mock-passages';
import {mockUsers} from '../../assets/mockData/mock-users';
import {User} from '../../assets/model/User.model';
import {filter, map, take} from 'rxjs/operators';
import {mockComments} from '../../assets/mockData/mock-comments';
import {MyComment} from '../../assets/model/MyComment.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private _passages = new BehaviorSubject<Passage[]>(mockPassges);
  private _users = new BehaviorSubject<User[]>(mockUsers);
  private _comments = new BehaviorSubject<MyComment[]>(mockComments);

  constructor() { }

  get users(){
    return this._users.asObservable();
  }

  get passages(){
    return this._passages.asObservable();
  }

  get comments(){
      return this._comments.asObservable();
  }

  getPsg(id: string){
    return this.passages.pipe(
        take(1),
        map(passages => {
          console.log(id);
          return {...passages.find(p => p.psgId == id)}
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

  getCom(id: string){
      return this.comments.pipe(
          take(1),
          map( comments => {
              return {...comments.find(c => c.cid == id)};
          })
      );
  }

  getComByPsgId(id: string){
      return this.comments.pipe(
          take(1),
          map( comments => {
              return {...comments};
          })
      );
  }
}
