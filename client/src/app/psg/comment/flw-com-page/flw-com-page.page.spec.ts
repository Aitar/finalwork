import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {FlwComPagePage} from './flw-com-page.page';

describe('FlwComPagePage', () => {
    let component: FlwComPagePage;
    let fixture: ComponentFixture<FlwComPagePage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FlwComPagePage],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(FlwComPagePage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
