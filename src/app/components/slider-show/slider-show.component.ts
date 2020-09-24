import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Peliculas } from '../../interfaces/interfaces-peliculas';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-slider-show',
  templateUrl: './slider-show.component.html',
  styleUrls: ['./slider-show.component.scss'],
})
export class SliderShowComponent implements OnInit {

@Input() peliculas: Peliculas[] = [];
slideopts = {
   slidesPerView: 1.2,
   freeMode: true,
   spaceBetween: 10
  };




  constructor( private modalctrl: ModalController) { }

  ngOnInit() {}

  async VerDetalle(id: string){
    console.log('pelicula', id);

    const modal = await this.modalctrl.create({
     component: DetalleComponent,
     componentProps: {id }

    });
      // tslint:disable-next-line: align
      modal.present();
    }
}
