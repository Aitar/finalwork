import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PsgPage } from './psg.page';

describe('PsgPage', () => {
  let component: PsgPage;
  let fixture: ComponentFixture<PsgPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PsgPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PsgPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
