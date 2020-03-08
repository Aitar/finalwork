import {Component, Input, OnInit} from '@angular/core';
import {Passage} from '../../../../assets/model/Passage.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-psg-block',
  templateUrl: './psg-block.component.html',
  styleUrls: ['./psg-block.component.scss'],
})
export class PsgBlockComponent implements OnInit {

  @Input() curPassage: Passage;

  constructor(private router: Router) { }

  ngOnInit() {}

  jumpDetail() {
    this.router.navigate(['/', 'psg', this.curPassage.psgId]);
  }

}
