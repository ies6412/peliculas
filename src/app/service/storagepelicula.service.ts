import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { PeliculasDetalle } from '../interfaces/interfacesdetalle';



@Injectable({
  providedIn: 'root'
})


export class StoragepeliculaService {
  peliculas: PeliculasDetalle[] = [];

  constructor(private storage: Storage,
              private toast: ToastController ) { }

   storagefavorito(pelicula: PeliculasDetalle){

    let existe = false;
    let mensaje = '';
    // const existe = this.peliculas.find(peli => peli.id === pelicula.id);
    for (const peli of this.peliculas)
     {
       if (peli.id === pelicula.id) {
       existe = true;
       }
       break;
     }
    console.log('exite->', existe);
    if (existe){
    this.peliculas = this.peliculas.filter(peli => peli.id !== pelicula.id);
    mensaje = 'Se ha removido de favoritos';
    }
    else{
      this.peliculas.push(pelicula);

      mensaje = 'Se ha guardado en favoritos';
    }
    this.storage.set('Pelicula', this.peliculas);
    this.mostrarinformacion(mensaje);
    return !existe;

  }


    async mostrarinformacion(message: string)
    {
     const toast = await this.toast.create({
       message,
       duration: 2500
     });
     toast.present();
   }

   async Cargrfavoritos(){
     const peliculas = await this.storage.get('Pelicula');

     this.peliculas = peliculas || [];
     return  peliculas;

   }
  async  existePelicula(id){
     // id = Number(id);
     await  this.Cargrfavoritos();
     const existes = this.peliculas.find(peli => peli.id === id);
     return (existes) ? true : false;

   }




}
