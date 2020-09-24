import { isGeneratedFile } from '@angular/compiler/src/aot/util';
import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

const URL = environment.ImgUrl;
@Pipe({
  name: 'imagen'
})

export class ImagenPipe implements PipeTransform {

  transform(img: string, size: string= 'w500', ): string {

    if (!img){
      return './assets/sin_iamgen.jpg';
    }
    const URLIMG = `${URL}/${size}${img}`;
    console.log(URLIMG);
    return URLIMG;
  }

}
