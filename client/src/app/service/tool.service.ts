import { Injectable } from '@angular/core';
import {Platform} from '@ionic/angular';
import {PsgService} from './psg.service';
import {CameraResultType, CameraSource, Capacitor, Plugins} from '@capacitor/core';

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

@Injectable({
  providedIn: 'root'
})
export class ToolService {
  selectedImage: string;

  constructor(private platform: Platform,
              private psgService: PsgService) { }




}
