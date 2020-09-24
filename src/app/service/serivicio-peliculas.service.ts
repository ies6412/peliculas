import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { InterfacesPeliculas } from '../interfaces/interfaces-peliculas';
import { environment } from '../../environments/environment';

// tslint:disable-next-line: no-unused-expression
const apikey = environment.apikeypelicula;
const Url = environment.url;




@Injectable({
  providedIn: 'root'
})
export class SerivicioPeliculasService {

  constructor(private httpservicio: HttpClient ) { }



CargarPeliculas(){

  const hoy = new Date();
  const ultimodia = new Date(hoy.getFullYear());
  console.log('ulyimo', hoy.getFullYear());

  return this.httpservicio.get<InterfacesPeliculas>(`${Url}/discover/movie?&api_key=${apikey}&primary_release_date.gte=${hoy.getFullYear()}-01-01&primary_release_date.lte=2020-12-31`);
}

PeliculasPopulares(){

  return this.httpservicio.get<InterfacesPeliculas>(`${Url}/discover/movie?api_key=${apikey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`);
}


}
