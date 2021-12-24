import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Platform} from '@ionic/angular';
import {CameraResultType, CameraSource, Capacitor, Plugins} from '@capacitor/core';
import {serverUrl} from '../../../../assets/config';
import {PsgService} from '../../../service/psg.service';
import {ToolService} from '../../../service/tool.service';

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
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss'],
})
export class ImagePickerComponent implements OnInit {
  serverUrl = serverUrl;
  selectedImage: string;

  constructor(private platform: Platform,
              private psgService: PsgService,
              private toolService: ToolService) { }

  ngOnInit() {}

  onPickImage() {
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
      let str: string;
      this.selectedImage = image.dataUrl;
      let file: File = this.onImagePicked(this.selectedImage);
      this.psgService.coverUpload(this.psgService.editPsg.id, file).subscribe((mssage) => {
        console.log(mssage);
        str = mssage.massage.toString();
        let last: string[] = str.split('/');
        console.log(last[last.length - 1]);
        this.psgService.editPsg.headerImgUrl = last[last.length - 1];
      },error => {
        console.log(error);
      });
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
