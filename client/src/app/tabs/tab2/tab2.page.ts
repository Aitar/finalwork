import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ToastService} from 'ng-zorro-antd-mobile';
import {User} from '../../../assets/model/User.model';
import {AuthService} from '../../service/auth.service';
import {serverUrl} from '../../../assets/config';
import {PsgService} from '../../service/psg.service';
import {Passage} from '../../../assets/model/Passage.model';
import {CameraResultType, CameraSource, Capacitor, Plugins} from '@capacitor/core';
import {Platform} from '@ionic/angular';
import {CKEditorComponent} from 'ng2-ckeditor/ckeditor.component';

function base64toBlob(base64Data, contentType) {
    contentType = contentType || '';
    const sliceSize = 1024;
    const byteCharacters = window.atob(base64Data);
    const bytesLength = byteCharacters.length;
    const slicesCount = Math.ceil(bytesLength / sliceSize);
    const byteArrays = new Array(slicesCount);

    for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
        const begin = sliceIndex * sliceSize;
        const end = Math.min(begin + sliceSize, bytesLength);

        const bytes = new Array(end - begin);
        for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
            bytes[i] = byteCharacters[offset].charCodeAt(0);
        }
        byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    return new File(byteArrays, 'file');
}

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
    selectedImage;
    online: boolean = true;
    psgTitle: string;
    psgContent: string;
    curUser: User;
    serverUrl = serverUrl;
    timer;
    loading = false;
    fisrtSave = true;
    isStreet = false;
    isHouse = false;

    stepSaveList: string[] = [];
    step: number;
    locked = false;

    protected config: any = {
        uiColor: '#F8F8F8',   // 编辑框背景色
        language: 'zh-cn',  // 显示语言
        toolbarCanCollapse: false,  // 是否可收缩功能栏
        toolbar: [['Image']],  // 工具部分
        height: 250,
    };



    constructor(private toast: ToastService,
                private authService: AuthService,
                private psgService: PsgService,
                private _toast: ToastService,
                private platform: Platform) {
    }

    ngOnInit() {
        this.loading = true;
        this.curUser = this.authService.curUser;
        this.psgService.editPsg = new Passage();
        let id = ((new Date()).valueOf() / 1000 + '').substring(0, 10);
        this.psgService.editPsg.psgAllArgsCst(id, '', this.curUser.id, null, 0, 0, '', 0, '');
        this.loading = false;
        this.timer = setInterval(() => {
            if(this.psgService.editPsg.title.length > 0){
                this.autoSave();
            }
        }, 60000);
    }

    publish() {
        let isTimeout = true;
        this.psgService.editPsg.viewedTime = -2;
        this.toast.loading('文章提交中', 10000);
        setTimeout(() => {
            this.toast.hide();
            if (isTimeout) {
                this.toast.fail('提交超时，请检查网络连接', 1000, () => {
                    return;
                });
            }
        }, 10000);
        //提交审核

        if(this.fisrtSave) {
            this.psgService.insertPsg(this.psgService.editPsg.id, this.psgService.editPsg.title, this.curUser.id, this.psgService.editPsg.content, this.psgService.editPsg.headerImgUrl, -2)
                .subscribe(
                    () => {
                        this.online = true;
                        this.fisrtSave = false;
                        this.toast.hide();
                        isTimeout = false;
                        this._toast.success('发布成功，等待审核', 1000);
                        this.reinit();
                    },
                    error => {
                        this.online = false;
                        this._toast.fail('自动保存失败', 1000);
                    });
        }else {
            this.psgService.updatePsg().subscribe(
                () => {
                    this.online = true;
                    this.toast.hide();
                    isTimeout = false;
                    this._toast.success('发布成功，等待审核', 1000);
                    this.reinit()
                },
                error => {
                    this.online = false;
                    this._toast.fail('自动保存失败', 1000);
                })
        }

        // this.psgService.insertPsg(this.psgTitle, this.authService.curUser.id, this.psgContent)
        //     .subscribe((massage) => {
        //         isTimeout = false;
        //         this.toast.hide();
        //         this.toast.success('成功提交！请等待审核结果', 1000);
        //     }, error => {
        //         isTimeout = false;
        //         this.toast.hide();
        //         this.toast.fail('网络连接失败！', 1000);
        //     });
    }

    autoSave() {
        if(this.psgService.editPsg.title.length <= 0) return;
        if(this.fisrtSave) {
            this.psgService.insertPsg(this.psgService.editPsg.id, this.psgService.editPsg.title, this.curUser.id, this.psgService.editPsg.content, this.psgService.editPsg.headerImgUrl, -1)
                .subscribe(
                    () => {
                        this.online = true;
                        this.fisrtSave = false;
                    },
                    error => {
                        this.online = false;
                        this._toast.fail('自动保存失败', 1000);
                    });
        }else {
            this.psgService.updatePsg().subscribe(
                () => {this.online = true;},
                error => {
                    this.online = false;
                    this._toast.fail('自动保存失败', 1000);
                })
        }
    }

    save() {
        this.autoSave();
        this.reinit();
    }


    uploadImage() {
        if (!Capacitor.isPluginAvailable('Camera')) {
            return;
        }
        Plugins.Camera.getPhoto({
            quality: 100,
            width: 300,
            allowEditing: true,
            source: CameraSource.Prompt,
            correctOrientation: true,
            resultType: CameraResultType.DataUrl
        }).then(image => {
            let timeout = true;
            this._toast.loading('上传中', 10000);
            setTimeout(() => {
                if (timeout) {
                    this._toast.hide();
                    this._toast.fail('上传超时', 1000, () => {
                        return;
                    });
                }
            }, 10000);
            this.selectedImage = image.dataUrl;
            let file: File = this.onImagePicked(this.selectedImage);
            this.psgService.imgUpload(this.psgService.editPsg.id, file).subscribe((massage) => {
                timeout = false;
                this.psgService.editPsg.content
                    = this.psgService.editPsg.content
                    + '<img src="' +massage.location + '" style="height: auto; max-width: 90%; left: 5%;"/>';
                console.log(this.psgService.editPsg.content);
                this._toast.hide();
                this._toast.success('上传成功', 1000);
            }, error => {
                timeout = false;
                this._toast.hide();
                this._toast.fail('上传失败，请重试', 1000);
            });
        }).catch(error => {
            console.log(error);
            return false;
        });
    }

    onImagePicked(imageData: string | File): File {
        let imageFile;
        if (typeof imageData === 'string') {
            try {
                imageFile = base64toBlob(imageData.replace('data:image/jpeg;base64,', ''), 'image/jpeg');
            } catch (e) {
                console.log(e);
                console.log(imageData);
                return;
            }
        } else {
            imageFile = imageData;
        }
        return imageFile;
    }

    stepSave() {
        if(!this.locked){
            let str = this.psgService.editPsg.content;
            this.stepSaveList.push(str);
            this.step = this.stepSaveList.length - 1;
            console.log(this.stepSaveList);
        }
    }

    unlock(){
        this.locked = false;
        while (this.stepSaveList.length - 1 > this.step) {
            this.stepSaveList.pop();
        }
    }

    stepBack(){
        if(this.step <= 0) return;
        console.log('step back');
        this.locked = true;
        if(this.step > 0) {
            --this.step;
            this.psgService.editPsg.content = this.stepSaveList[this.step];
        }
    }

    stepForward(){
        if(this.step >= this.stepSaveList.length - 1) return;
        console.log('step forward');
        this.locked = true;
        if(this.step < this.stepSaveList.length){
            ++this.step;
            this.psgService.editPsg.content = this.stepSaveList[this.step];
        }
    }

    house() {
        this.isHouse = !this.isHouse;
    }

    street() {
        this.isStreet = !this.isStreet;
    }

    reinit() {
        this.fisrtSave = true;
        let id = ((new Date()).valueOf() / 1000 + '').substring(0, 10);
        this.psgService.editPsg.psgAllArgsCst(id, '', this.curUser.id, null, 0, 0, '', 0, '');
    }
}
