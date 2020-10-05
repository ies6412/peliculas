import { Component, OnInit } from '@angular/core';
import { Peliculas } from '../../interfaces/interfaces-peliculas';
import { Genre, PeliculasDetalle } from '../../interfaces/interfacesdetalle';
import { StoragepeliculaService } from '../../service/storagepelicula.service';
import { SerivicioPeliculasService } from '../../service/serivicio-peliculas.service';
import { PeliculaActores } from '../../interfaces/interfacesactores';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page  {


peliculas: PeliculasDetalle[] = [];
genero: Genre[] = [];
favoritogenero: any[] = [];



  constructor( private cargar: StoragepeliculaService,
               private generomvie: SerivicioPeliculasService) {}
  
  async  ionViewWillEnter(){

    this.peliculas = await this.cargar.Cargrfavoritos();
    this.genero = await this.generomvie.CargarGenerosFavorito();
    console.log('moviers-->', this.genero);
    this.peliculasporGenero(this.genero,this.peliculas)

   }

  peliculasporGenero(genero: Genre[], pelicula: PeliculasDetalle[]){

    this.favoritogenero = [];
    console.log('sadsadas',pelicula.length);
    if(pelicula.length>0)
    {
      genero.forEach(generos => {
        this.favoritogenero.push({
          genero: generos.name,
          pelis: pelicula.filter(peli => {
            return peli.genres.find(gen => gen.id === generos.id);
          })
        });
      });
    }
    else{
      return;
    }

    
   



  }

}
