import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {filter, map, switchMap, take, tap} from 'rxjs/operators';
import {LikeMap} from '../../assets/model/LikeMap.model';
import {HttpClient} from '@angular/common/http';
import {serverUrl} from '../../assets/config';
import {FlwMap} from '../../assets/model/FlwMap.model';
import {AuthService} from './auth.service';
import {CollectMap} from '../../assets/model/CollectMap.model';
import {Trace} from '../../assets/model/Trace.model';


@Injectable({
    providedIn: 'root'
})
export class DataService {
    private _likeMaps = new BehaviorSubject<LikeMap[]>([]);
    private _flwerMaps = new BehaviorSubject<FlwMap[]>([]);
    private _flwedMaps = new BehaviorSubject<FlwMap[]>([]);
    private _collcetMaps = new BehaviorSubject<CollectMap[]>([]);
    isTrace = true;

    constructor(private http: HttpClient,
                private authService: AuthService) {}

    get likeMaps() {
        return this._likeMaps.asObservable();
    }

    get flwedMaps(){
        return this._flwedMaps.asObservable();
    }

    get flwerMaps(){
        return this._flwerMaps.asObservable();
    }

    get collectMaps(){
        return this._collcetMaps.asObservable();
    }

    getLikeMapByUId(id: string){
        return this.http.get(`${serverUrl}/like/user/${id}`)
            .pipe(
                map(resData => {
                    let likeMaps = [];
                    for(let key in resData){
                        if(resData.hasOwnProperty(key)){
                            let likeMap = new LikeMap();
                            likeMap.allArgs(resData[key].id, resData[key].uid, resData[key].pid);
                            likeMaps.push(likeMap);
                        }
                    }
                    return likeMaps;
                }),
                tap( likeMaps => {
                    this._likeMaps.next(likeMaps);
                })
            );
    }

    undoLike(likeMap: LikeMap) {
       return this.http.delete<{massage: string}>(`${serverUrl}/like/${likeMap.id}`);
    }

    like(likeMap: LikeMap){
       return this.http
           .post<{massage: string}>(
               `${serverUrl}/like`,
               likeMap)
           .pipe(
               switchMap(()=> {
                   return this.likeMaps;
               }),
               take(1),
               tap(likeMaps => {
                   this._likeMaps.next(likeMaps.concat(likeMap))
               })
           )
    }

    getFlwMapByFlwer(flwer: string){
        return this.http.get<FlwMap[]>(`${serverUrl}/flw/flwer/${flwer}`)
            .pipe(
                map(resData => {
                    let flwMaps = [];
                    for(let key in resData){
                        if(resData.hasOwnProperty(key)){
                            let flwMap  = new FlwMap();
                            flwMap.allArgs(resData[key].id, resData[key].follower, resData[key].followed);
                            flwMaps.push(flwMap);
                        }
                    }
                    return flwMaps;
                }),
                tap(flwMaps => {
                    this._flwerMaps.next(flwMaps);
                })
            );
    }

    getFlwMapByFlwed(flwed: string){
        return this.http.get<FlwMap[]>(`${serverUrl}/flw/flwed/${flwed}`)
            .pipe(
                map(resData => {
                    let flwMaps = [];
                    for(let key in resData){
                        if(resData.hasOwnProperty(key)){
                            let flwMap  = new FlwMap();
                            flwMap.allArgs(resData[key].id, resData[key].follower, resData[key].followed);
                            flwMaps.push(flwMap);
                        }
                    }
                    return flwMaps;
                }),
                tap(flwMaps => {
                    this._flwerMaps.next(flwMaps);
                })
            );
    }

    follow(id: string, tarId: string){

        let flwMap = new FlwMap();
        flwMap.allArgs(id, this.authService.curUser.id, tarId);
        return this.http.post<{massage: string}>(`${serverUrl}/flw`, flwMap);
    }

    undoFollow(id: string){
        return this.http.delete(`${serverUrl}/flw/${id}`);
    }

    isCollected(uid: string, pid: string){
       return this.http.post(
            `${serverUrl}/collect/is`,
            {'uid': uid, 'pid': pid}
            );
    }

    collect(collect: CollectMap){
        return this.http.
        post(`${serverUrl}/collect`, collect)
            .pipe(
                switchMap(()=> {
                    return this.collectMaps;
                }),
                take(1),
                tap(collectMaps => {
                    this._collcetMaps.next(collectMaps.concat(collect))
                })
        )
    }

    undoCollect(id: string){
        console.log(id);
        return this.http.delete(`${serverUrl}/collect/${id}`)
            .pipe(
                switchMap(()=> {
                    return this.collectMaps;
                }),
                take(1),
                tap(collectMaps => {
                    for(let i = 0; i < collectMaps.length; i++){
                        if(collectMaps[i].id == id){
                            collectMaps.splice(i, 1);
                        }
                    }
                    this._collcetMaps.next(collectMaps);
                })
            )
    }

    undoCollectByTwo(uid: string, pid: string){
       return this.http.post(
            `${serverUrl}/collect/deleteByTwo`,
            {'uid':uid, 'pid': pid});
    }

    postTrace(trace: Trace){
        return this.http.post(`${serverUrl}/trace`, trace);
    }

    postRate(userId: string, psgId: string, rating: number){
        this.http.post(
            `${serverUrl}/rate`,
            {"userId": userId, "psgId": psgId, "Rating": rating, "timestamp": new Date().getTime()}
        ).subscribe()
    }

    add0(m) {
        return m < 10 ? '0' + m : m
    }

    getLocalTime(nS) {
        var time = new Date(nS);
        var y = time.getFullYear();
        var m = time.getMonth() + 1;
        var d = time.getDate();
        var h = time.getHours();
        var mm = time.getMinutes();
        var s = time.getSeconds();
        return y + '-' + this.add0(m) + '-' + this.add0(d) + ' ' + this.add0(h) + ':' + this.add0(mm) + ':' + this.add0(s);
    }

    formatIt(date: Date, form: string) {
        const pad = (n: number) => (n < 10 ? `0${n}` : n);
        const dateStr = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
        const timeStr = `${pad(date.getHours())}:${pad(date.getMinutes())}`;
        if (form === 'YYYY-MM-DD') {
            return dateStr;
        }
        if (form === 'HH:mm') {
            return timeStr;
        }
        return `${dateStr} ${timeStr}`;
    }

}
