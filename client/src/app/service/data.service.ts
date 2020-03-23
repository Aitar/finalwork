import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Passage} from '../../assets/model/Passage.model';
import {mockPassges} from '../../assets/mockData/mock-passages';
import {mockUsers} from '../../assets/mockData/mock-users';
import {User} from '../../assets/model/User.model';
import {filter, map, take} from 'rxjs/operators';
import {mockComments} from '../../assets/mockData/mock-comments';
import {MyComment} from '../../assets/model/MyComment.model';
import {LikeMap} from '../../assets/model/LikeMap.model';
import {mockLike} from '../../assets/mockData/mock-likes';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    private _passages = new BehaviorSubject<Passage[]>(mockPassges);
    private _users = new BehaviorSubject<User[]>(mockUsers);
    private _comments = new BehaviorSubject<MyComment[]>(mockComments);
    private _likeMaps = new BehaviorSubject<LikeMap[]>(mockLike);

    constructor() {
    }

    get users() {
        return this._users.asObservable();
    }

    get passages() {
        return this._passages.asObservable();
    }

    get comments() {
        return this._comments.asObservable();
    }

    get likeMap() {
        return this._likeMaps.asObservable();
    }

    getPsg(id: string) {
        return this.passages.pipe(
            take(1),
            map(passages => {
                console.log(id);
                return {...passages.find(p => p.psgId == id)}
            })
        );
    }

    getUser(id: string) {
        return this.users.pipe(
            take(1),
            map(users => {
                return {...users.find(u => u.userId == id)};
            })
        );
    }

    getCom(id: string) {
        return this.comments.pipe(
            take(1),
            map(comments => {
                return {...comments.find(c => c.cid == id)};
            })
        );
    }

    getComByPsgId(id: string) {
        return this.comments.pipe(
            take(1),
            map(comments => {
                return {...comments};
            })
        );
    }

    getLikeMapByPsgId(id: string) {
        return this.likeMap.pipe(
            map(maps => {
                return maps.find(m => m.pid == id);
            })
        );
    }

    undoLike(id: number) {
        return this.likeMap.pipe(
            map(maps => {
                console.log('1');
                for (let i = 0; i < maps.length; i++) {
                    if (maps[i].id == id) {
                        maps.splice(i, 1);
                    }
                }
                console.log(mockLike);
            })
        );
    }

    like(userId: string, psgId: string) {
        return this.likeMap.pipe(
            map(maps => {
                maps.push(new LikeMap(maps[maps.length - 1].id + 1, userId, psgId));
                console.log(mockLike);
                return maps.find(m => m.pid == psgId);
            })
        );
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
}
