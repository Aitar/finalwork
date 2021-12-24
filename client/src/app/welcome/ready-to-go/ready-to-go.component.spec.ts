import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReadyToGoComponent } from './ready-to-go.component';

describe('ReadyToGoComponent', () => {
  let component: ReadyToGoComponent;
  let fixture: ComponentFixture<ReadyToGoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadyToGoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReadyToGoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
