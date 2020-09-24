import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SliderShowComponent } from './slider-show/slider-show.component';
import { PipesModule } from '../pipes/pipes.module';
import { SliderPosterComponent } from './slider-poster/slider-poster.component';
import { SliderParesComponent } from './slider-pares/slider-pares.component';
import { DetalleComponent } from './detalle/detalle.component';



@NgModule({

  entryComponents: [
   DetalleComponent
  ],

  declarations: [SliderShowComponent, SliderPosterComponent, SliderParesComponent, DetalleComponent],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule,

  ],
  exports: [SliderShowComponent, SliderPosterComponent, SliderParesComponent, DetalleComponent],
})
export class ComponentsModule { }
