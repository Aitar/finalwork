import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StyleChooseComponent } from './style-choose.component';

describe('StyleChooseComponent', () => {
  let component: StyleChooseComponent;
  let fixture: ComponentFixture<StyleChooseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StyleChooseComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StyleChooseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
