import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SliderParesComponent } from './slider-pares.component';

describe('SliderParesComponent', () => {
  let component: SliderParesComponent;
  let fixture: ComponentFixture<SliderParesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SliderParesComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SliderParesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
