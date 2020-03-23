import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {PsgBlockComponent} from './psg-block.component';

describe('PsgBlockComponent', () => {
    let component: PsgBlockComponent;
    let fixture: ComponentFixture<PsgBlockComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PsgBlockComponent],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(PsgBlockComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
