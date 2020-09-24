import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Peliculas } from '../../interfaces/interfaces-peliculas';

@Component({
  selector: 'app-slider-pares',
  templateUrl: './slider-pares.component.html',
  styleUrls: ['./slider-pares.component.scss'],
})
export class SliderParesComponent implements OnInit {

  @Input() Pelis: Peliculas [] = [];
  @Output() cargarmas = new EventEmitter();
  slideopts2 = {
   slidesPerView: 3.2,
   freeMode: true,
   spaceBetween: -20

  };
  constructor() { }

  ngOnInit() {

  }
  onclick(){
    this.cargarmas.emit();
    //console.log('cargar mas');
  }

}
