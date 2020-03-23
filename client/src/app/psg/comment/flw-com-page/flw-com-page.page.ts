import {Component, OnDestroy, OnInit} from '@angular/core';
import {MyComment} from '../../../../assets/model/MyComment.model';
import {DataService} from '../../../service/data.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {NavController} from '@ionic/angular';

@Component({
    selector: 'app-flw-com-page',
    templateUrl: './flw-com-page.page.html',
    styleUrls: ['./flw-com-page.page.scss'],
})
export class FlwComPagePage implements OnInit, OnDestroy {
    curCom: MyComment;
    loadedCom: MyComment[] = [];
    comSub: Subscription;

    constructor(private dataService: DataService,
                private router: ActivatedRoute,
                private navCtrl: NavController) {
    }

    ngOnInit() {
        this.router.paramMap.subscribe(paramMap => {
            if (!paramMap.has('cId')) {
                this.navCtrl.navigateBack(['/', 'psg', paramMap.get('psgId'), 'comment']);
                return;
            }

            this.comSub = this.dataService.getCom(paramMap.get('cId')).subscribe(comment => {
                this.curCom = comment;
            })
        })

    }

    ngOnDestroy(): void {
        if (this.comSub)
            this.comSub.unsubscribe();
    }

}
