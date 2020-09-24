import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SliderShowComponent } from './slider-show/slider-show.component';
import { PipesModule } from '../pipes/pipes.module';
import { SliderPosterComponent } from './slider-poster/slider-poster.component';
import { SliderParesComponent } from './slider-pares/slider-pares.component';



@NgModule({
  declarations: [SliderShowComponent, SliderPosterComponent, SliderParesComponent],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule
  ],
  exports: [SliderShowComponent, SliderPosterComponent, SliderParesComponent],
})
export class ComponentsModule { }
