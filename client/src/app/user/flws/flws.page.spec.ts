import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FlwsPage } from './flws.page';

describe('FlwsPage', () => {
  let component: FlwsPage;
  let fixture: ComponentFixture<FlwsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlwsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FlwsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
