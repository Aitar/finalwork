import {Component, OnInit, ViewChild, ViewChildren} from '@angular/core';
import {Passage} from '../../../assets/model/Passage.model';
import {PsgService} from '../../service/psg.service';
import {AuthService} from '../../service/auth.service';
import {PsgBlockComponent} from './psg-block/psg-block.component';

@Component({
    selector: 'app-psgs',
    templateUrl: './psgs.page.html',
    styleUrls: ['./psgs.page.scss'],
})
export class PsgsPage implements OnInit {
    index = 1;
    loadedPsgs: Passage[] = [];
    loadedDrafts: Passage[] = [];
    isLoading = false;
    isLoadingD = false;

    @ViewChildren(PsgBlockComponent)
    private psgBlockComponent: PsgBlockComponent;

    constructor(private psgService: PsgService,
                private authService: AuthService) {
    }

    ngOnInit() {
        this.isLoading = true;
        this.psgService.getPsgsByUID(this.authService.curUser.id, 0).subscribe(() => {
            this.psgService.ppsgs.subscribe(passages => {
                this.loadedPsgs = passages;
                this.isLoading = false;
            })
        })

        this.isLoadingD = true;
        this.psgService.getPsgsByUID(this.authService.curUser.id, -1).subscribe(() => {
            this.psgService.ppsgs.subscribe(passages => {
                console.log(passages)
                this.loadedDrafts = passages;
                this.isLoadingD = false;
            })
        })
    }



    onChange(item) {
        console.log('onChange', item);
    }

    onTabClick(item) {
        console.log('onTabClick', item);
    }

    selectCard(e) {
        console.log(' ', JSON.stringify(e));
    }

    changeIndex() {
        this.index = 0;
    }

}
