import {Component, Input, OnInit, Output} from '@angular/core';
import {Passage} from '../../../../assets/model/Passage.model';
import {ModalService, ToastService} from 'ng-zorro-antd-mobile';
import {PsgService} from '../../../service/psg.service';
import {NavController} from '@ionic/angular';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {User} from '../../../../assets/model/User.model';
import {UserService} from '../../../service/user.service';
import {serverUrl} from '../../../../assets/config';

@Component({
    selector: 'app-psg-block',
    templateUrl: './psg-block.component.html',
    styleUrls: ['./psg-block.component.scss'],
})
export class PsgBlockComponent implements OnInit {
    @Input() psg: Passage;
    writer:User;
    isLoading = false;
    serverUrl: string = serverUrl;
    left = [
        {
            text: '修改',
            onPress: () => console.log('修改'),
            style: {backgroundColor: '#108ee9', color: 'white'},
        },
        {
            text: '删除',
            onPress: () => this._modal.alert('删除', '确定要删除文章吗?', [
                {text: '取消'},
                {
                    text: '删除',
                    onPress: () => this.deletePsg(),
                    style: {
                        color: '#ffffff',
                        background: '#F4333C'
                    }
                }
            ]),
            style: {backgroundColor: '#F4333C', color: 'white'},
        }
    ];


    constructor(private _modal: ModalService,
                private _toast: ToastService,
                private psgService: PsgService,
                private userService: UserService,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.isLoading = true;
        this.userService.getUser(this.psg.author).subscribe(user => {
            this.writer = user;
            this.isLoading = false;
            console.log(this.psg);
        })
    }

    deletePsg() {
        console.log(this.psg.id);
        let isTimeout = true;
        this._toast.loading('删除中', 10000);
        setTimeout(() => {
            this._toast.hide();
            if (isTimeout) {
                this._toast.fail('加载超时，请检查网络连接', 1000, () => {
                    return;
                });
            }
        }, 10000);

        this.psgService.deletePsg(this.psg.id).subscribe(()=>{
            this._toast.hide();
            isTimeout = false;
            this._toast.success('删除成功', 1000);
        })
    }

}
