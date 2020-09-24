import { Component, OnInit, Input } from '@angular/core';
import { Peliculas } from '../../interfaces/interfaces-peliculas';

@Component({
  selector: 'app-slider-pares',
  templateUrl: './slider-pares.component.html',
  styleUrls: ['./slider-pares.component.scss'],
})
export class SliderParesComponent implements OnInit {

  @Input() Pelis: Peliculas []= [];
  slideopts2 = {
   slidesPerView: 3.2,
   freeMode: true, 
   spaceBetween: -20

  };
  constructor() { }

  ngOnInit() {
    
  }

}
