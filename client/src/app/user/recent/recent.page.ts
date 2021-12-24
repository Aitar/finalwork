import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../service/auth.service';
import {PsgService} from '../../service/psg.service';
import {Passage} from '../../../assets/model/Passage.model';
import {DataService} from '../../service/data.service';

@Component({
  selector: 'app-recent',
  templateUrl: './recent.page.html',
  styleUrls: ['./recent.page.scss'],
})
export class RecentPage implements OnInit {
  loadedPsgs: Passage[] = [];
  loading = false;
  constructor(private authService: AuthService,
              private psgService: PsgService,
              private dataService: DataService) { }

  ngOnInit() {
    this.loading = true;
    this.psgService.getRcentPsgsByUId(this.authService.curUser.id).subscribe(() => {
        this.psgService.recentPsgs.subscribe((psgs) => {
          this.loadedPsgs = psgs;
          this.loading = false;
        })
    })
  }

  keepTrace() {
    this.dataService.isTrace = true;
  }
}
