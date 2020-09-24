import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { InterfacesPeliculas } from '../interfaces/interfaces-peliculas';
import { environment } from '../../environments/environment';
import { PeliculasDetalle } from '../interfaces/interfacesdetalle';
import { PeliculaActores } from '../interfaces/interfacesactores';


// tslint:disable-next-line: no-unused-expression
const apikey = environment.apikeypelicula;
const Url = environment.url;




@Injectable({
  providedIn: 'root'
})
export class SerivicioPeliculasService {
  private Popularespages = 0;

  constructor(private httpservicio: HttpClient ) { }



CargarPeliculas(){

  const hoy = new Date();
  const ultimodia = new Date(hoy.getFullYear());
 // console.log('ulyimo', hoy.getFullYear());

  return this.httpservicio.get<InterfacesPeliculas>(`${Url}/discover/movie?&api_key=${apikey}&primary_release_date.gte=${hoy.getFullYear()}-01-01&primary_release_date.lte=2020-12-31`);
}

PeliculasPopulares(){
  this.Popularespages++;
  return this.httpservicio.get<InterfacesPeliculas>(`${Url}/discover/movie?api_key=${apikey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${this.Popularespages}`);
}

Detallepelicula(id: string){
 return this.httpservicio.get<PeliculasDetalle>(`https://api.themoviedb.org/3/movie/${id}?api_key=f6566882055f3376040e49a1fec8bdb5&language=en-US`);
}
DetalleActores(id: string){
  console.log('detalleactor', id);
  // tslint:disable-next-line: max-line-length
  return this.httpservicio.get<PeliculaActores>(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=f6566882055f3376040e49a1fec8bdb5&language=en-US`);
 }


}
