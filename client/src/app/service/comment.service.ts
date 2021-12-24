import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {MyComment} from '../../assets/model/MyComment.model';
import {HttpClient} from '@angular/common/http';
import {serverUrl} from '../../assets/config';
import {map, switchMap, take, tap} from 'rxjs/operators';
import {User} from '../../assets/model/User.model';
import {FlwComment} from '../../assets/model/FlwComments.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private _comments = new BehaviorSubject<MyComment[]>([]);
  private _flwComments = new BehaviorSubject<FlwComment[]>([]);
  comTemp: MyComment;
  comOwnerTemp: User;
  serverUrl = serverUrl;

  constructor(private http: HttpClient) { }

  get comments(){
    return this._comments.asObservable();
  }

  get flwComments(){
      return this._flwComments.asObservable();
  }

  getComByPsgId(psgId: string){
    return this.http.get<{[key: string] : MyComment}>(`${serverUrl}/comments/psg/${psgId}`)
        .pipe(
            map(resData => {
                    console.log(`${serverUrl}/comments/psg/${psgId}`);
                  let coms = [];
                  for (let key in resData) {
                    if(resData.hasOwnProperty(key)){
                      let com = new MyComment();
                      com.allArgs(
                          resData[key].id,
                          resData[key].owner,
                          resData[key].tarPsg,
                          resData[key].content,
                          resData[key].time,
                          resData[key].followNum,
                          resData[key].likeNum,
                          resData[key].hotIdx
                      );
                      coms.push(com);
                    }
                  }
                  return coms;
            }),
            tap(coms => {
              this._comments.next(coms);
            })
        );
  }

  getComById(id: string){
     return this.http.get<MyComment>(`${this.serverUrl}/comments/${id}`);
  }

  insertCom(comment: MyComment){
     return this.http.post<{massage: string}>(
         `${this.serverUrl}/comment`,
         comment,
     ).pipe(
         switchMap(() => {
             return this.comments
         }),
         take(1),
         tap( coms => {
             this._comments.next(coms.concat(comment));
         })
     )
  }

  deleteCom(id: String){
     return this.http.delete<{massage: string}>(`${this.serverUrl}/comment/${id}`)
          .pipe(
              switchMap(() => {
                  return this.comments
              }),
              take(1),
              tap(coms => {
                  let temp = coms.find(c => c.id == id);
                  coms.splice(coms.indexOf(temp), 1);
                  this._comments.next(coms);
              })
          )
  }

  getFlwComByTarId(tarId: string){
     return this.http.get(`${serverUrl}/flwComment/com/${tarId}`)
          .pipe(
              map(resData => {
                  let flwComs = [];
                  for (let key in resData) {
                      if(resData.hasOwnProperty(key)){
                          let flwCom = new FlwComment();
                          flwCom.allArgs(
                              resData[key].id,
                              resData[key].owner,
                              resData[key].tarComment,
                              resData[key].content,
                              resData[key].time,
                              resData[key].hotIdx
                          );
                          flwComs.push(flwCom);
                      }
                  }
                  return flwComs;
              }),
              tap(flwComs => {
                  this._flwComments.next(flwComs);
              })
          );
  }

  insertFlwCom(flwCom: FlwComment){
      return this.http.post<{massage: string}>(
          `${this.serverUrl}/flwComment`,
          flwCom,
      ).pipe(
          switchMap(() => {
              return this.flwComments
          }),
          take(1),
          tap( flwComs => {
              this._flwComments.next(flwComs.concat(flwCom));
          })
      )
  }

  deleteFlwCom(id: string){
      return this.http.delete<{massage: string}>(`${this.serverUrl}/flwComment/${id}`)
          .pipe(
              switchMap(() => {
                  return this.flwComments;
              }),
              take(1),
              tap(flwComs => {
                  let temp = flwComs.find(c => c.id == id);
                  flwComs.splice(flwComs.indexOf(temp), 1);
                  this._flwComments.next(flwComs);
              })
          )
  }
}
