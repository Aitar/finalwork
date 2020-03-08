import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {Passage} from '../../assets/model/Passage.model';
import {User} from '../../assets/model/User.model';
import {ActivatedRoute} from '@angular/router';
import {NavController} from '@ionic/angular';
import {DataService} from '../service/data.service';

@Component({
  selector: 'app-psg',
  templateUrl: './psg.page.html',
  styleUrls: ['./psg.page.scss'],
})
export class PsgPage implements OnInit {
  private psgSub: Subscription;
  private userSub: Subscription;
  private curPsg: Passage;
  private curUser: User;

  constructor(private router: ActivatedRoute,
              private navCtrl: NavController,
              private dataService: DataService) { }

  ngOnInit() {
    this.router.paramMap.subscribe( paramMap => {

      if(!paramMap.has('psgId')){
        this.navCtrl.navigateBack(['/', 'tabs', 'tab1']);
        return;
      }
      console.log(paramMap.get('psgId'));
      //如果有passId则获取文章并且获取成功后获取用户
      this.psgSub = this.dataService.getPsg(paramMap.get('psgId')).subscribe( passage => {

        this.curPsg = passage;
        console.log(this.curPsg);
        this.userSub = this.dataService.getUser(this.curPsg.userId).subscribe( user => {
          this.curUser = user;
        });
      });
    })
  }

}
