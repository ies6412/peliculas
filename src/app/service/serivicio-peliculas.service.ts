import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { InterfacesPeliculas, Peliculas } from '../interfaces/interfaces-peliculas';
import { environment } from '../../environments/environment';
import { PeliculasDetalle, Genre } from '../interfaces/interfacesdetalle';
import { PeliculaActores } from '../interfaces/interfacesactores';
import { Observable } from 'rxjs';




// tslint:disable-next-line: no-unused-expression
const apikey = environment.apikeypelicula;
const Url = environment.url;
const hoy = new Date();






@Injectable({
  providedIn: 'root'
})
export class SerivicioPeliculasService {
  private Popularespages = 0;
   private Popularespagesnombre = 0;
private Popularespagegenero = 0;
private genero = 0;
private nombrepelicula = '';
  generos: Genre[] = [];

  constructor(private httpservicio: HttpClient) { }



CargarPeliculas(){

  // const hoy = new Date();
  const ultimodia = new Date(hoy.getFullYear());
 // console.log('ulyimo', hoy.getFullYear());

  return this.httpservicio.get<InterfacesPeliculas>(`${Url}/discover/movie?&api_key=${apikey}&primary_release_date.gte=${hoy.getFullYear()}-01-01&primary_release_date.lte=2020-12-31`);
}

PeliculasPopulares(){
  this.Popularespages++;
  return this.httpservicio.get<InterfacesPeliculas>(`${Url}/discover/movie?api_key=${apikey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${this.Popularespages}`);
}

Detallepelicula(id: string){
 return this.httpservicio.get<PeliculasDetalle>(`https://api.themoviedb.org/3/movie/${id}?api_key=${apikey}&language=en-US`);
}
DetalleActores(id: string){
  // console.log('detalleactor', id);
  // tslint:disable-next-line: max-line-length
  return this.httpservicio.get<PeliculaActores>(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apikey}&language=en-US`);
 }

 CargarGenerosFavorito(): Promise<Genre[]>{

  return new Promise(resolve => {
     this.httpservicio.get('https://api.themoviedb.org/3/genre/movie/list?a=1&api_key=f6566882055f3376040e49a1fec8bdb5&language=en-US')
    .subscribe(respu => {

      this.generos = respu['genres'];
      resolve(this.generos);
    });
  });
 }


 GeneroPelicula(){
  return this.httpservicio.get<PeliculasDetalle>(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apikey}&language=en-US`);
}

CargarPeliculasGenero(genero: number, pagina: number){

 const hoys = new Date();
 const ultimodias = new Date(hoys.getFullYear());
// console.log('ulyimo', hoy.getFullYear());



 if (this.genero === genero){
   // this.PageHeadlineCategorias=pagina;
    this.Popularespagegenero = pagina;

  }
  else
  {
    this.Popularespagegenero = 1;
    this.genero = genero;
  }

 console.log('pagina genero', this.Popularespagegenero);

 return this.httpservicio.get<InterfacesPeliculas>(`${Url}/discover/movie?&api_key=${apikey}&primary_release_date.gte=${hoy.getFullYear()}-01-01&primary_release_date.lte=2020-12-31&page=${this.Popularespagegenero}`);
}

TraerPeliculaPorNombre(nombre: string){

 if (this.nombrepelicula === nombre){
   // this.PageHeadlineCategorias=pagina;
   this.Popularespagesnombre++;
  }
  else
  {
    this.Popularespagesnombre = 1;
    this.nombrepelicula = nombre;
  }

 console.log('pagina nombre', this.Popularespagesnombre, 'nombrepelicula', this.nombrepelicula, 'nombre', nombre);

 return this.httpservicio.get<InterfacesPeliculas>(`${Url}/search/movie?query=${nombre}&api_key=${apikey}&language=en-US&page=${this.Popularespagesnombre}&include_adult=false`);


}


}
