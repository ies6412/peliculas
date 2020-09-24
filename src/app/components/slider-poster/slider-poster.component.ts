import { Component, OnInit, Input } from '@angular/core';
import { Peliculas } from '../../interfaces/interfaces-peliculas';
@Component({
  selector: 'app-slider-poster',
  templateUrl: './slider-poster.component.html',
  styleUrls: ['./slider-poster.component.scss'],
})
export class SliderPosterComponent implements OnInit {

@Input() Pelis: Peliculas[] = [];
slideopts2 = {
   slidesPerView: 3.2,
   freeMode: true,
   spaceBetween: 10

  };
  constructor() { }

  ngOnInit() {}

}
