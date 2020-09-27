import { Component, OnInit, ViewChild, EventEmitter, Input, Output } from '@angular/core';
import { SerivicioPeliculasService } from '../../service/serivicio-peliculas.service';
import { Genre } from '../../interfaces/interfacesdetalle';
import { IonSearchbar, IonSegment, ModalController } from '@ionic/angular';

import { InterfacesPeliculas, Peliculas } from '../../interfaces/interfaces-peliculas';
import { Resultadoporgenero } from '../../interfaces/resultadoporgenero';

import { DetalleComponent } from '../../components/detalle/detalle.component';




@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  constructor(private Servicios: SerivicioPeliculasService,
              private modalctrl: ModalController) {}


  @ViewChild('segmento', { static: true})segmento: IonSegment;
  @ViewChild('search', {static: true})search: IonSearchbar;

  peliculagenero: InterfacesPeliculas[] = [];
  resultadogeneropeliculas: Resultadoporgenero[] = [];

  genero: Genre[] = [];
  valorseg = 0;
  valorindice = 0;
  contador = 0;
  textabuscar = '';

  ngOnInit(){

    this.Servicios.GeneroPelicula().subscribe(respuesta => {
     // console.log('respuesta', respuesta);
      this.genero = respuesta.genres;
     // console.log('respuesta', respuesta.genres[9]);
    });
    this.buscarpeliculas();

  }

  onSearchChange(event){
    this.textabuscar = event.detail.value;
    // console.log('buscar de search', this.textabuscar);
    this.resultadogeneropeliculas = [];
    console.log('onsearch');
    this.buscarpeliculas(0, this.textabuscar);
  }

  valordesegmento( event){
    this.contador = 0;
    this.valorindice = event.detail.value;
    this.resultadogeneropeliculas = [];
    this.valorseg = this.genero[this.valorindice].id;

    console.log('valordesegmento-->', this.genero[this.valorindice].id, 'elemto vacio');
    this.buscarpeliculas(this.genero[this.valorindice].id);

  }
  buscarpeliculas(id?: number, nombrepelicula?: string, event?){
    console.log('evebto de', event, 'nombre', nombrepelicula, 'id', id);

    if (id > 0){

      this.Servicios.CargarPeliculasGenero(this.genero[this.valorindice].id).subscribe(respu => {

       console.log('valor->....', respu.results, 'valordesegmento', this.genero[this.valorindice].id);
       respu.results.forEach((value) => {

        value.genre_ids.forEach(idgenero => {
          if (respu.results.length === 0)
        {
          event.target.disabled = true;
          event.target.complete();
          return;
        }

      // this.resultadogeneropeliculas.push(...resp.articles); // con esto inserto cada uno de los articulos...
          if (event)
       {
         event.target.complete();
       }
          if (idgenero === id) {
             this.contador++;
             this.resultadogeneropeliculas.push(value);
           }
         });
       });
      });
    }

    if (nombrepelicula){
      this.resultadogeneropeliculas = [];
      console.log(nombrepelicula);
     // traer nombres de peliulas desde el servicio
      this.Servicios.TraerPeliculaPorNombre(nombrepelicula).subscribe(respu => {
        respu.results.forEach(valor => {
          if (respu.results.length === 0)
      {
        event.target.disabled = true;
        event.target.complete();
        return;
      }

    // this.Noticias.push(...resp.articles); // con esto inserto cada uno de los articulos...
        if (event)
        {
       event.target.complete();
        }
        // this.aux.push(valor);
        this.resultadogeneropeliculas.push(valor);
      },
      );
      // console.log('resultado value', this.resultadogeneropeliculas);

     });


    }
    if (!id && !nombrepelicula) {
     // console.log('nada');
      return;
    }




  }


  async VerDetalle(id: string){
     console.log('pelicula', id);

     const modal = await this.modalctrl.create({
     component: DetalleComponent,
     componentProps: {id }

    });
      // tslint:disable-next-line: align
      modal.present();
    }

    loadData(event){


   //   console.log('valor de indice', this.genero[this.valorindice].id, 'buscar', this.textabuscar, event);
    // tslint:disable-next-line: align
    this.buscarpeliculas(this.genero[this.valorindice].id, this.textabuscar, event);

  }



}




