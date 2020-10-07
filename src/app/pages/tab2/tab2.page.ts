import { Component, OnInit, ViewChild} from '@angular/core';
import { SerivicioPeliculasService } from '../../service/serivicio-peliculas.service';
import { Genre } from '../../interfaces/interfacesdetalle';
import { IonInfiniteScroll, IonSearchbar, IonSegment, ModalController } from '@ionic/angular';

import { InterfacesPeliculas, Peliculas } from '../../interfaces/interfaces-peliculas';

import { DetalleComponent } from '../../components/detalle/detalle.component';
import { send } from 'process';




@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  constructor(private Servicios: SerivicioPeliculasService,
              private modalctrl: ModalController) {


              }


  @ViewChild('segmento', {static: true})segmento: IonSegment;
  @ViewChild('search', {static: true})search: IonSearchbar;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;


  peliculagenero: InterfacesPeliculas[] = [];
  aux: Peliculas[] = [];
  // resultadogeneropeliculas: Resultadoporgenero[] = [];

  // de pruebas
  resultadogeneropeliculas: Peliculas[] = [];
  ssearch = false;
  ssegment = false;


  genero: Genre[] = [];
  valorseg = 0;
  valorindice = 0;
  contador = 0;
  valor = '';

  ngOnInit(){

   // console.log('valor de segmento', this.segmento.value, 'search->', this.search.placeholder);


   this.Servicios.GeneroPelicula().subscribe(respuesta => {
     console.log('respuesta', respuesta);
     this.genero = respuesta.genres;


    });

  }



  valorpalabra(){

    this.resultadogeneropeliculas = [];
    if (this.valor.length > 0)
      {
        console.log(this.valor);
        this.buscarportexto(this.valor);
      }
      else{

        return;
      }

    }

  valordesegmento( event){
    console.log(event);
    this.ssegment = true;
    this.valor = '';
    this.contador = 0;
    this.valorindice = event.detail.value;
    this.resultadogeneropeliculas = [];

    this.valorseg = this.genero[this.valorindice].id;
    console.log('valordesegmento-->', this.genero[this.valorindice].id);
    this.BuscarPorGenero(this.valorseg );


  }



  loadData(event){

    console.log('load evet->',   this.infiniteScroll.disabled);
    event.target.disabled = false;

    console.log('this.valor.length', this.valor, 'this.valorseg', this.valorseg);
    if (this.valor.length > 0)
   {this.buscarportexto(this.valor, event); }
    if (this.valorseg !== 0){
    this.BuscarPorGenero(this.valorseg , event);
   }

 }

 buscarportexto(nombrepelicula: string, event? ){




  console.log('valor de segmento', this.valorseg);


  this.Servicios.TraerPeliculaPorNombre(nombrepelicula).subscribe(respuesta => {
       console.log(respuesta, respuesta.results.length);

       if (respuesta.results.length === 0)
    {

      event.target.disabled = true;
      event.target.complete();
      this.toggleInfiniteScroll();
      return;
    }


      // this.resultadogeneropeliculas.push(...resp.articles); // con esto inserto cada uno de los articulos...
       if (event)
   {
    event.target.complete();

   }
       this.resultadogeneropeliculas.push(...respuesta.results);


  });

}
toggleInfiniteScroll() {

  this.infiniteScroll.disabled = !this.infiniteScroll.disabled;

}

   BuscarPorGenero(id: number , event?){
     this.aux = [];
     let pages = 1;
     for (pages === 1; pages <= 20; pages++)
       {

        this.Servicios.CargarPeliculasGenero(id, pages).subscribe(respu => {
      // tslint:disable-next-line: whitespace

         respu.results.forEach(value =>
           {
             value.genre_ids.forEach(valueid =>
               {
                  if (valueid === id)
                  {

                    this.resultadogeneropeliculas.push(value);
                                }
                });


            });
        });


      }



    //  console.log('aqui', this.aux.length);
    //  this.aux.forEach(element => {
    //          if (this.aux.length === 0)
    //         {

    //       event.target.disabled = true;
    //       event.target.complete();
    //       console.log('eventdisabled:', event.target.disabled);
    //      // this.toggleInfiniteScroll();
    //       return;
    //        }


    //          if (event)
    //       {
    //       event.target.complete();
    //        }
    //          this.resultadogeneropeliculas.push(...this.aux);


    //        });




      // this.aux.push(pages);
      // console.log(this.aux);




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

// onSearchChange(event){
  //   this.ssearch = true;
  //   this.textabuscar = event.detail.value;
  //   this.valor=this.textabuscar;
  //   this.resultadogeneropeliculas = [];
  //   // tslint:disable-next-line: semicolon
  //   console.log('valor de segento', this.segmento, 'boole', this.ssegment);
  //  /* if (this.ssegment){
  //   this.valorseg = this.valorseg;
  //    }
  //    else
  //    {this.valorseg = 0; }
  //   this.buscarpeliculas(this.valorseg, this.textabuscar);*/
  //   console.log('buscar de search', this.textabuscar);
  //   if (this.textabuscar.length >  0)
  //   {
  //     this.buscarportexto(this.textabuscar);

  //   }
  //   else
  //   { return; }

  // }


  /*
  buscarpeliculas(id?: number, nombrepelicula?: string, event?){
    // buscarpeliculas(nombrepelicula: string, event?){
    console.log( 'ingresa a la function-->buscarpelicula', 'id=', id, 'nombre=', nombrepelicula,  'evento de', event);

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
      this.Servicios.TraerPeliculaPorNombre(nombrepelicula).subscribe(respuestas => {
       console.log('resultado->', respuestas.results);
        if (respuestas.results.length === 0)
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


        this.resultadogeneropeliculas.push(...respuestas.results);
          // this.aux.push(valor);
      // console.log('resultado value', this.resultadogeneropeliculas);

     });


    }
    // if (!id && !nombrepelicula) {
     // console.log('nada');
      // return;
   // }




  }

*/





}




