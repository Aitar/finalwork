import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {FlwComBlockComponent} from './flw-com-block.component';

describe('FlwComBlockComponent', () => {
    let component: FlwComBlockComponent;
    let fixture: ComponentFixture<FlwComBlockComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FlwComBlockComponent],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(FlwComBlockComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
