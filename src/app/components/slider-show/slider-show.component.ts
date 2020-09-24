import { Component, Input, OnInit } from '@angular/core';
import { Peliculas } from '../../interfaces/interfaces-peliculas';

@Component({
  selector: 'app-slider-show',
  templateUrl: './slider-show.component.html',
  styleUrls: ['./slider-show.component.scss'],
})
export class SliderShowComponent implements OnInit {

@Input() peliculas: Peliculas[] = [];
slideopts = {
   slidesPerView: 1.2,
   freeMode: true,
   spaceBetween: 10
  };




  constructor() { }

  ngOnInit() {}

}
