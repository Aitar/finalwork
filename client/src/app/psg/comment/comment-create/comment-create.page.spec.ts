import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CommentCreatePage } from './comment-create.page';

describe('CommentCreatePage', () => {
  let component: CommentCreatePage;
  let fixture: ComponentFixture<CommentCreatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentCreatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CommentCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
