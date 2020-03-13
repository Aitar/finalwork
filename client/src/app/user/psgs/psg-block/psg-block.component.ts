import {Component, Input, OnInit} from '@angular/core';
import {Passage} from '../../../../assets/model/Passage.model';
import {ModalService, ToastService} from 'ng-zorro-antd-mobile';

@Component({
  selector: 'app-psg-block',
  templateUrl: './psg-block.component.html',
  styleUrls: ['./psg-block.component.scss'],
})
export class PsgBlockComponent implements OnInit {
  @Input() psg: Passage;
  left = [
    {
      text: '修改',
      onPress: () => console.log('修改'),
      style: { backgroundColor: '#108ee9', color: 'white' },
    },
    {
      text: '删除',
      onPress: () => this._modal.alert('删除', '确定要删除文章吗?', [
        { text: '取消'},
        { text: '删除',
          onPress: () => this.deletePsg(),
          style: {
            color: '#ffffff',
            background: '#F4333C'
          }
        }
      ]),
      style: { backgroundColor: '#F4333C', color: 'white' },
    }
  ];

  constructor(private _modal: ModalService,
              private _toast: ToastService) { }

  ngOnInit() {}

  deletePsg(){
    console.log(this.psg.psgId);

  }

}
