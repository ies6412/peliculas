import { Component, OnInit, Input } from '@angular/core';
import { Peliculas } from '../../interfaces/interfaces-peliculas';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../detalle/detalle.component';
@Component({
  selector: 'app-slider-poster',
  templateUrl: './slider-poster.component.html',
  styleUrls: ['./slider-poster.component.scss'],
})
export class SliderPosterComponent implements OnInit {

@Input() Pelis: Peliculas[] = [];
slideopts2 = {
   slidesPerView: 3.2,
   freeMode: true,
   spaceBetween: 10

  };
  constructor(private modalctrl: ModalController) { }

  ngOnInit() {}
  async VerDetallepopulares(id: string){
    // console.log('cartelera', id);

    const modal = await this.modalctrl.create({
     component: DetalleComponent,
     componentProps: {id }

    });
      // tslint:disable-next-line: align
      modal.present();
    }

}
