import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PsgCardComponent } from './psg-card.component';

describe('PsgCardComponent', () => {
  let component: PsgCardComponent;
  let fixture: ComponentFixture<PsgCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PsgCardComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PsgCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
