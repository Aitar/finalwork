import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../assets/model/User.model';
import {DataService} from '../service/data.service';
import {Subscription} from 'rxjs';
import {NavController} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import {ActionSheetService, ToastService} from 'ng-zorro-antd-mobile';
import {AuthService} from '../service/auth.service';
import {serverUrl} from '../../assets/config';
import {UserService} from '../service/user.service';
import {CameraResultType, CameraSource, Capacitor, Plugins} from '@capacitor/core';
import {PsgService} from '../service/psg.service';
import {Passage} from '../../assets/model/Passage.model';

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
    selector: 'app-user',
    templateUrl: './user.page.html',
    styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit{
    curUser: User;
    serverUrl:string = serverUrl;
    loading = false;
    self = true;
    selectedImage;
    loadedPsgs: Passage[] = [];

    constructor(private dataService: DataService,
                private authService: AuthService,
                private userService: UserService,
                private psgService: PsgService,
                private navCtrl: NavController,
                private route: ActivatedRoute,
                private _actionSheet: ActionSheetService,
                private _toast: ToastService) {
    }

    ngOnInit(){
        this.loading = true;
        this.route.paramMap.subscribe(paramMap => {
            if (!paramMap.has('userId')) {
                //获取信息用户失败
                this.navCtrl.back();
                return;
            }
            let userid = paramMap.get('userId');
            if(userid == this.authService.curUser.id) {
                this.curUser = this.authService.curUser;
                this.self = true;
                this.psgService.getPsgsByUID(userid, 0).subscribe(() => {
                    this.psgService.ppsgs.subscribe(psgs => {
                        this.loadedPsgs = psgs;
                        this.loading = false;
                    })
                })
            } else{
                this.userService.getUser(userid).subscribe(user => {
                    this.curUser = user;
                    this.self = false;
                    this.psgService.getPsgsByUID(userid, 0).subscribe(() => {
                        this.psgService.ppsgs.subscribe(psgs => {
                            this.loadedPsgs = psgs;
                            this.loading = false;
                        })
                    })
                });
            }
        });

    }


    back() {
       if(this.self) this.navCtrl.navigateBack('tabs/tab3');
       else this.navCtrl.navigateBack('tabs/tab1');
    }

    viewFollows(message) {
        const BUTTONS = ['取 消'];
        this._actionSheet.showActionSheetWithOptions(
            {
                options: BUTTONS,
                cancelButtonIndex: BUTTONS.length - 1,
                destructiveButtonIndex: BUTTONS.length - 2,
                message: message,
                maskClosable: true
            },
            buttonIndex => {
                console.log(buttonIndex);
            }
        );
    }

    uploadCover(type: string) {
        if(!Capacitor.isPluginAvailable('Camera')){
            return;
        }
        Plugins.Camera.getPhoto({
            quality: 100,
            allowEditing: true,
            source: CameraSource.Prompt,
            correctOrientation: true,
            resultType: CameraResultType.DataUrl
        }).then(image => {

            let timeout = true;
            this._toast.loading('上传中', 10000);
            setTimeout(()=>{
                if(timeout){
                    this._toast.hide();
                    this._toast.fail('上传超时', 1000, () => {
                        return;
                    })
                }
            }, 10000);

            this.selectedImage = image.dataUrl;
            let file: File = this.onImagePicked(this.selectedImage);
            if(type == 'avatar'){
                this.userService.uploadAvatar(file, this.curUser.id).subscribe(() => {
                    timeout = false;
                    this._toast.hide();
                    this._toast.success('上传成功', 1000);
                }, error => {
                    timeout = false;
                    this._toast.hide();
                    this._toast.fail('上传失败，请重试', 1000);
                })
            }else if(type == 'cover'){
                this.userService.uploadCoverImg(file, this.curUser.id).subscribe(() => {
                    timeout = false;
                    this._toast.hide();
                    this._toast.success('上传成功', 1000);
                }, error => {
                    timeout = false;
                    this._toast.hide();
                    this._toast.fail('上传失败，请重试', 1000);
                })
            }
        }).catch(error => {
            console.log(error);
            return false;
        });
    }

    onImagePicked(imageData: string | File): File{
        let imageFile;
        if(typeof imageData === 'string'){
            try {
                imageFile = base64toBlob(imageData.replace('data:image/jpeg;base64,', ''), 'image/jpeg');
            }catch (e) {
                console.log(e);
                console.log(imageData);
                return;
            }
        }else{
            imageFile = imageData;
        }
        return imageFile;
    }
}
