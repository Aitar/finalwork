import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {PsgsPage} from './psgs.page';

describe('PsgsPage', () => {
    let component: PsgsPage;
    let fixture: ComponentFixture<PsgsPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PsgsPage],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(PsgsPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
