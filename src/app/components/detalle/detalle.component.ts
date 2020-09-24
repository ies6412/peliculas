import { Component, Input, OnInit } from '@angular/core';
import { SerivicioPeliculasService } from '../../service/serivicio-peliculas.service';
import { PeliculasDetalle } from '../../interfaces/interfacesdetalle';
import { Cast } from '../../interfaces/interfacesactores';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {

  @Input() id;
  peliculadetalle: PeliculasDetalle = {};
  oculto = 80;
  PeliculaActores: Cast[] = [];

  slidesactores = {
    slidesPerView: 3.2,
   freeMode: true,
   spaceBetween: -5

  };

  constructor(private servicio: SerivicioPeliculasService,
              private modalctrl: ModalController) { }

  ngOnInit() {
   // console.log('en modal', this.id);
    this.servicio.Detallepelicula(this.id).subscribe(respuesta => {
      console.log('detalle', respuesta);
      this.peliculadetalle = respuesta;
    });

    this.servicio.DetalleActores(this.id).subscribe(actores => {
      console.log('actres', actores.cast);
      this.PeliculaActores = actores.cast;
    });


  }
  agregarafavorito(){}
  regresar(){
    this.modalctrl.dismiss();
  }

}
