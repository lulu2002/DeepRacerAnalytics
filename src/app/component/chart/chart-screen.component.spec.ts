import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ChartScreenComponent} from './chart-screen.component';

describe('ChartComponent', () => {
    let component: ChartScreenComponent;
    let fixture: ComponentFixture<ChartScreenComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ChartScreenComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ChartScreenComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
