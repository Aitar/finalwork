import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PsgComCreatePage } from './psg-com-create.page';

describe('PsgComCreatePage', () => {
  let component: PsgComCreatePage;
  let fixture: ComponentFixture<PsgComCreatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PsgComCreatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PsgComCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
