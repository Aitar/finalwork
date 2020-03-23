import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, switchMap, take, tap} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs';
import {User} from '../../assets/model/User.model';
import {Passage} from '../../assets/model/Passage.model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  serverUrl: string = 'http://localhost:8080';
  private _users = new BehaviorSubject<User[]>([]);
  private _psgs = new BehaviorSubject<Passage[]>([]);

  constructor(private http: HttpClient) { }

  get users(){
    return this._users.asObservable();
  }

  get psgs(){
    return this._psgs.asObservable();
  }

  fetchUsers(){
    return this.http.get<{[key: string] : User}>(this.serverUrl + '/users')
      .pipe(
        map( resData => {
          let users = [];
          for(let key in resData){
            if(resData.hasOwnProperty(key)){
              console.log(resData[key]);
              let user = new User();
              user.user1(
                resData[key].id,
                resData[key].nickName,
                resData[key].email,
                resData[key].avatarUrl,
                resData[key].password,
                resData[key].birthday,
                resData[key].gender,
                resData[key].statement,
                resData[key].regDate,
                resData[key].point,
                resData[key].loginTime,
                resData[key].lastLogin,
                resData[key].follows,
                resData[key].followed,
                resData[key].psgNum,
                resData[key].collectNum,
                resData[key].likedNum
              );
              users.push(user);
            }//if
          }//for
          return users;
        }),
        tap(users => {
          this._users.next(users);
        })
      );
  }

  getUser(id: string){
    return this.http.get<User>(`${this.serverUrl}/users/${id}`)
      .pipe(
        map(userData => {
          let user = new User();
          user.user1(id,
            userData.nickName,
            userData.email,
            userData.avatarUrl,
            userData.password,
            userData.birthday,
            userData.gender,
            userData.statement,
            userData.regDate,
            userData.point,
            userData.loginTime,
            userData.lastLogin,
            userData.follows,
            userData.followed,
            userData.psgNum,
            userData.collectNum,
            userData.likedNum);
          return user;
        })
      )
  }

  updateUser(user: User){
    return this.http.put(this.serverUrl, user);
  }

  insertUser(nickName: string, email: string, password: string){
    let generateId = 'user' + (new Date()).valueOf();
    let user = new User();
    user.user2(generateId, nickName, email, password);
    return this.http.post(
      `${this.serverUrl}/user`,
      user
    ).pipe(
      switchMap(()=> {
        return this.users
      }),
      take(1),
      tap(users => {
        this._users.next(users.concat(user))
      })
    )
  }

  deleteUserById(id: string){
    return this.http.delete(`${this.serverUrl}/user/${id}`);
  }

  fetchPsgs(){
   return this.http.get<{[key: string] : Passage}>(this.serverUrl + '/psgs')
      .pipe(
        map( resData =>{
          let psgs = [];
          for(let key in resData){
            if(resData.hasOwnProperty(key)){
              let psg = new Passage();
              psg.psgAllArgsCst(
                resData[key].id,
                resData[key].title,
                resData[key].author,
                resData[key].headerImgUrl,
                resData[key].liked,
                resData[key].comments,
                resData[key].content,
                resData[key].viewedTime,
                resData[key].updatedTime
              );
              psgs.push(psg);
            }//if
          }//for
          return psgs;
        }),
        tap(psgs => {
          this._psgs.next(psgs);
        })
      )
  }

  getPsg(id: string){
    return this.http.get<Passage>(`${this.serverUrl}/psg/${id}`)
      .pipe(
        map( resData => {
          let psg = new Passage();
          psg.psgAllArgsCst(
            resData.id,
            resData.title,
            resData.author,
            resData.headerImgUrl,
            resData.liked,
            resData.comments,
            resData.content,
            resData.viewedTime,
            resData.updatedTime
          );
          return psg;
        })
      )
  }

  insertPsg(id: string, title: string, author: string, content: string){
    let psg = new Passage();
    psg.psgNomCst(id, title, author, null, content);
    return this.http.post(
      `${this.serverUrl}/psg`,
      psg
    ).pipe(
      switchMap(()=> {
        return this.psgs
      }),
      take(1),
      tap(psgs => {
        this._psgs.next(psgs.concat(psg))
      })
    )
  }

  deletePsg(id: string){
    return this.http.delete(`${this.serverUrl}/psg/${id}`);
  }
}
