import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CommentPagPage } from './comment-pag.page';

describe('CommentPagPage', () => {
  let component: CommentPagPage;
  let fixture: ComponentFixture<CommentPagPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentPagPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CommentPagPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
