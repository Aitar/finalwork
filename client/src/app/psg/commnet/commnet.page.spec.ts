import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CommnetPage } from './commnet.page';

describe('CommnetPage', () => {
  let component: CommnetPage;
  let fixture: ComponentFixture<CommnetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommnetPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CommnetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
