import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {User} from '../../assets/model/User.model';
import {map, switchMap, take, tap} from 'rxjs/operators';
import {DataService} from './data.service';
import {AuthService} from './auth.service';
import {serverUrl} from '../../assets/config';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  serverUrl: string = serverUrl;
  private _users = new BehaviorSubject<User[]>([]);
  private _fans = new BehaviorSubject<User[]>([]);
  private _flws = new BehaviorSubject<User[]>([]);

  constructor(private http: HttpClient,
              private dataService: DataService,
              private authService: AuthService) { }

  get users(){
    return this._users.asObservable();
  }

  get fans(){
    return this._fans.asObservable();
  }

  get flws(){
    return this._flws.asObservable();
  }

  getUser(id: string){
    return this.http.get<User>(`${this.serverUrl}/users/${id}`)
        .pipe(
            map(userData => {
              let user = new User();
              user.allArgs(id,
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
    return this.http.put(`${this.serverUrl}/user/${user.id}`, user);
  }

  insertUser(nickName: string, email: string, password: string){
    let generateId = ((new Date()).valueOf() / 1000 + '').substring(0, 10);
    let user = new User();
    user.nomoralCst(generateId, nickName, email, password);
    return this.http.post<{massage: string}>(`${this.serverUrl}/user`, user);
  }

  deleteUserById(id: string){
    return this.http.delete(`${this.serverUrl}/user/${id}`);
  }

  getFans(){
    return this.http.get<{[key: string] : User}>(`${this.serverUrl}/flw/flwedUser/${this.authService.curUser.id}`)
        .pipe(
            map( resData => {
              let users = [];
              for(let key in resData){
                if(resData.hasOwnProperty(key)){
                  console.log(resData[key]);
                  let user = new User();
                  user.allArgs(
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
              this._fans.next(users);
            })
        );
  }

  getFlws(){
    return this.http.get<{[key: string] : User}>(`${this.serverUrl}/flw/flwerUser/${this.authService.curUser.id}`)
        .pipe(
            map( resData => {
              let users = [];
              for(let key in resData){
                if(resData.hasOwnProperty(key)){
                  console.log(resData[key]);
                  let user = new User();
                  user.allArgs(
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
              this._flws.next(users);
            })
        );
  }

  uploadAvatar(file: File, id: string){
      const formData = new FormData();
      formData.append('avatar', file, file.name);
      return this.http.post(`${serverUrl}/user/avatar/${id}`, formData);
  }

  uploadCoverImg(file: File, id:string){
      const formData = new FormData();
      formData.append('cover', file, file.name);
      return this.http.post(`${serverUrl}/user/cover/${id}`, formData);
  }
}
