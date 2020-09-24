import { Component, OnInit} from '@angular/core';


import { SerivicioPeliculasService } from 'src/app/service/serivicio-peliculas.service';
import { Peliculas } from '../../interfaces/interfaces-peliculas';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {




  Peliculas: Peliculas[] =  [];
  Populares: Peliculas[] =  [];

 /* slideopts = {
   slidesPerView: 1.2,
   freeMode: true

  };*/
  constructor( private servicio: SerivicioPeliculasService) {}

 ngOnInit(){
  this.servicio.CargarPeliculas().subscribe(pelicula => {
     // console.log('respuesta', pelicula.results );
      this.Peliculas.push(...pelicula.results);

  });

  this.getpopulares();

 }

 cargarMas(){

  this.getpopulares();

}
getpopulares(){

  this.servicio.PeliculasPopulares().subscribe(pelicula => {
   // console.log('populares', pelicula.results);
    const arrtem = [...this.Populares, ...pelicula.results];
    this.Populares = arrtem;
  });
}
}
