import { Component, Input, OnInit } from '@angular/core';
import { SerivicioPeliculasService } from '../../service/serivicio-peliculas.service';
import { PeliculasDetalle } from '../../interfaces/interfacesdetalle';
import { ModalController } from '@ionic/angular';
import { Cast } from '../../interfaces/interfacesactores';
import { Peliculas } from '../../interfaces/interfaces-peliculas';
import { StoragepeliculaService } from '../../service/storagepelicula.service';

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
  estrella = 'star-outline';

  slidesactores = {
    slidesPerView: 3.2,
   freeMode: true,
   spaceBetween: -5

  };

  constructor(private servicio: SerivicioPeliculasService,
              private modalctrl: ModalController,
              private storage: StoragepeliculaService ) { }

 ngOnInit() {


   this.storage.existePelicula(this.id).then(existe => this.estrella = (existe) ? 'star' : 'star-outline');
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

  regresar(){
    this.modalctrl.dismiss();
  }

  agregarafavorito(){
   const existe = this.storage.storagefavorito(this.peliculadetalle);
   this.estrella = (existe) ? 'star' : 'star-outline';



  }

}
