import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PsgMgtComponent} from './psg-mgt.component';

describe('PsgMgtComponent', () => {
  let component: PsgMgtComponent;
  let fixture: ComponentFixture<PsgMgtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PsgMgtComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PsgMgtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
