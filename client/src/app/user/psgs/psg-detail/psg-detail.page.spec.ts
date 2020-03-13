import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PsgDetailPage } from './psg-detail.page';

describe('PsgDetailPage', () => {
  let component: PsgDetailPage;
  let fixture: ComponentFixture<PsgDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PsgDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PsgDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
