import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from '../../service/data.service';
import {Passage} from '../../../assets/model/Passage.model';
import {Subscription} from 'rxjs';
import {ToastService} from 'ng-zorro-antd-mobile';
import {PsgService} from '../../service/psg.service';
import {AuthService} from '../../service/auth.service';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, OnDestroy {
    private loadPsgs: Passage[] = [];
    private psgSub: Subscription;
    searchValue: string;
    isLoading = false;

    constructor(private psgService: PsgService,
                private authService: AuthService,
                private _toast: ToastService) {
    }

    ngOnInit(): void {
        this.isLoading = true;
        let isTimeout: boolean = true;

        this._toast.loading('加载中', 10000);
        setTimeout(() => {
            // this._toast.hide();
            if (isTimeout) {
                this._toast.fail('加载超时！', 2000, () => {
                    return;
                });
            }
        }, 10000);

        this.psgSub = this.psgService.fetchPsgs(this.authService.curUser.id).subscribe(
            psgs => {
            this.loadPsgs = psgs;
            this._toast.hide();
            this.isLoading = false;
            isTimeout = false;
        });
    }

    ngOnDestroy(): void {
        if (this.psgSub)
            this.psgSub.unsubscribe();
    }

    submit(value) {
        console.log(value, 'onSubmit');
    }

    reflush() {

    }

    //下拉刷新
    abc = { activate: '下拉刷新', deactivate: ' ', release: ' ', finish: ' ' }
    pageLimit = 20;
    public directionCount = 0;
    page = 0;
    state = {
        refreshState: {
            currentState: 'deactivate',
            drag: true
        },
        direction: 'down',
        endReachedRefresh: false,
        height: 1000,
        data: [],
        directionName: 'both up and down'
    };
    dtPullToRefreshStyle = { height: this.state.height + 'px' };


    pullToRefresh(event) {
        let isLoading = true;
        let loading = this._toast.loading('刷新中', 10000, null,false);
        this.psgSub = this.psgService.fetchPsgs(this.authService.curUser.id).subscribe(
            psgs => {
                isLoading = false;
                this.loadPsgs = psgs;
                this._toast.hide();
            });
    }
}
