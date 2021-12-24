import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Passage} from '../../assets/model/Passage.model';
import {HttpClient} from '@angular/common/http';
import {User} from '../../assets/model/User.model';
import {map, switchMap, take, tap} from 'rxjs/operators';
import {serverUrl} from '../../assets/config';
import {DataService} from './data.service';

@Injectable({
    providedIn: 'root'
})
export class PsgService {
    serverUrl: string = serverUrl;
    editPsg: Passage;
    private _psgs = new BehaviorSubject<Passage[]>([]);
    private _ppsgs = new BehaviorSubject<Passage[]>([]);
    private _cpsgs = new BehaviorSubject<Passage[]>([]);
    private _recentPsgs = new BehaviorSubject<Passage[]>([]);

    constructor(private http: HttpClient,
                private dataService: DataService) {
    }

    get psgs() {
        return this._psgs.asObservable();
    }

    get ppsgs() {
        return this._ppsgs.asObservable();
    }

    get cpsgs() {
        return this._cpsgs.asObservable();
    }

    get recentPsgs() {
        return this._recentPsgs.asObservable();
    }


    /**
     * 获取当前用户被推荐的文章
     * @param userId
     */
    fetchPsgs(userId: string) {
        return this.http.get(this.serverUrl + '/psg/recs/' + userId)    //获取的是当前用户被推荐的文章
        // return this.http.get(this.serverUrl + '/psgs')
            .pipe(
                map(
                    resData => {
                    let psgs = [];
                    for (let key in resData) {
                        if (resData.hasOwnProperty(key)) {
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
            );
    }

    /**
     * 根据文章ID获取一篇文章
     * @param id
     */
    getPsg(id: string) {
        return this.http.get<Passage>(`${this.serverUrl}/psg/${id}`)
            .pipe(
                map(resData => {
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
            );
    }

    insertPsg(id: string, title: string, author: string, content: string, headerImgUrl: string, stat: number) {
        let psg = new Passage();
        psg.psgNomCst(id, title, author, headerImgUrl, content, ' ');
        psg.viewedTime = stat;
        console.log(psg);
        return this.http.post<{ massage: string }>(
            `${this.serverUrl}/psg`,
            psg //传给url的数据
        ).pipe(
            switchMap(() => {
                return this.psgs;
            }),
            take(1),
            tap(psgs => {
                this._psgs.next(psgs.concat(psg));
            })
        );
    }

    deletePsg(id: string) {
        return this.http.delete(`${this.serverUrl}/psg/${id}`)
            .pipe(
                switchMap(() => {
                    return this.ppsgs;
                }),
                take(1),
                tap(psgs => {
                    console.log(id);
                    let index;
                    for (let i = 0; i < psgs.length; i++) {
                        if (psgs[i].id == id) {
                            index = i;
                        }
                    }
                    console.log(index);
                    console.log(psgs);
                    psgs.splice(index, 1);
                    this._ppsgs.next(psgs);
                    console.log(psgs);
                })
            );
    }

    updatePsg() {
        return this.http.put(`${serverUrl}/psg`, this.editPsg);
    }

    /**
     * 获取当前用户某一状态的文章
     * @param uid
     * @param stat 0：已发布文章；1：草稿；2：审核中文章；3：审核未通过文章
     */
    getPsgsByUID(uid: string, stat: number) {
        let url: string;
        switch (stat){
            case 0:
                url = `${serverUrl}/psg/user/${uid}`;
                break;
            case 1:
                url = `${serverUrl}/psg/draft/${uid}`;
                break;
            case 2:
                url = `${serverUrl}/psg/varifying/${uid}`;
                break;
            case 3:
                url = `${serverUrl}/psg/unpassed/${uid}`;
                break;

        }
        return this.http
            .get(url)
            .pipe(
                map(resData => {
                    let psgs = [];
                    for (let key in resData) {
                        if (resData.hasOwnProperty(key)) {
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
                    this._ppsgs.next(psgs);
                })
            );
    }

    getCltPsgsByUId(uid: string) {
        return this.http
            .get(`${serverUrl}/collect/${uid}`)
            .pipe(
                map(resData => {
                    let psgs = [];
                    for (let key in resData) {
                        if (resData.hasOwnProperty(key)) {
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
                    this._cpsgs.next(psgs);
                })
            );
    }

    getRcentPsgsByUId(uid: string) {
        return this.http.get(this.serverUrl + '/trace/user/' + uid)
            .pipe(
                map(resData => {
                    let psgs = [];
                    for (let key in resData) {
                        if (resData.hasOwnProperty(key)) {
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
                    this._recentPsgs.next(psgs);
                })
            );
    }

    formLikeAndCommentsNum(passage: Passage) {
        if (passage.liked > 1000) {
            passage.liked = passage.liked / 1000 + '';
            for (let i = 0; i < passage.liked.length; i++) {
                if (passage.liked.charAt(i) == '.') {
                    passage.liked = passage.liked.substring(0, i + 2) + 'k';
                    break;
                }
            }
        }
        if (passage.comments > 1000) {
            passage.comments = passage.comments / 1000 + ' ';
            for (let i = 0; i < passage.comments.length; i++) {
                if (passage.comments.charAt(i) == '.') {
                    passage.comments = passage.comments.substring(0, i + 2) + 'k';
                    break;
                }
            }
        }
    }

    imgUpload(id: string, file: File) {
        const formData = new FormData();
        formData.append('file', file, file.name);
        return this.http.post<{ location: string }>(`${serverUrl}/image`, formData);
    }

    coverUpload(id: string, file: File) {
        const formData = new FormData();
        formData.append('file', file, file.name);
        return this.http.post<{ massage: string }>(`${serverUrl}/image`, formData);
    }

    getPsgRecs(id: string){
        return this.http.get<Passage[]>(`${this.serverUrl}/psg/recs/psg/${id}`);
    }
}
