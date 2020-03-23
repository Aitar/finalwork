import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NavController} from '@ionic/angular';
import {PickerRef, PickerService, ToastService} from 'ng-zorro-antd-mobile';

@Component({
    selector: 'app-report',
    templateUrl: './report.page.html',
    styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {

    report: string;
    name = '选择举报原因';
    value = [];
    reasons = [
        '辱骂攻击',
        '色情低俗',
        '垃圾广告',
        '血腥暴恐',
        '其他'
    ];

    constructor(private route: ActivatedRoute,
                private navCrtl: NavController,
                private _toast: ToastService,
                private _picker: PickerService) {
    }

    ngOnInit() {
        this.route.paramMap.subscribe(paramMap => {
            if (!paramMap.has('entity') || !paramMap.has('id')) {
                this._toast.fail('获取举报对象失败！', 2000);
                setTimeout(() => {
                    this.navCrtl.back();
                    return;
                }, 2000);
            }

            //获取举报对象基本信息
            this.getEntity(paramMap.get('id'), paramMap.get('entity'));
        })
    }

    getEntity(id: string, entityname: string) {

    }

    submitReport() {
        console.log(this.report);
    }

    getResult(result) {
        this.value = [];
        let temp = '';
        result.forEach(item => {
            this.value.push(item.label || item);
            temp += item.label || item;
        });
        return this.value.map(v => v).join(',');
    }

    getValue(result) {
        let value = [];
        let temp = '';
        result.forEach(item => {
            value.push(item.value || item);
            temp += item.value || item;
        });
        return value;
    }

    showPicker() {
        const ref: PickerRef = this._picker.showPicker(
            {value: this.value, data: this.reasons},
            result => {
                this.name = this.getResult(result);
                this.value = this.getValue(result);
            },
            cancel => {
                console.log('cancel');
            }
        );
    }
}
