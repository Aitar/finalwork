import {Component, OnInit} from '@angular/core';
import {DataService} from '../../service/data.service';

@Component({
    selector: 'app-config',
    templateUrl: './config.page.html',
    styleUrls: ['./config.page.scss'],
})
export class ConfigPage implements OnInit {
    constructor(private dataService: DataService) {
    }

    ngOnInit() {
    }

    changeTrace() {
        this.dataService.isTrace = !this.dataService.isTrace;
        console.log(this.dataService.isTrace);
    }
}
