import { Component, OnInit } from '@angular/core';
import {Passage} from '../../../assets/model/Passage.model';
import {PsgService} from '../../service/psg.service';
import {AuthService} from '../../service/auth.service';

@Component({
  selector: 'app-collect',
  templateUrl: './collect.page.html',
  styleUrls: ['./collect.page.scss'],
})
export class CollectPage implements OnInit {
  loadedPsgs: Passage[] = [];
  isLoading = false;
  constructor(private psgService: PsgService,
              private authService: AuthService) { }

  ngOnInit() {
    this.isLoading = true;
    this.psgService.getCltPsgsByUId(this.authService.curUser.id)
        .subscribe(psgs=>{
          this.loadedPsgs = psgs;
          this.isLoading = false;
        })
  }

}
