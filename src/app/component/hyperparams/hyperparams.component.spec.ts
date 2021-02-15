import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HyperparamsComponent } from './hyperparams.component';

describe('HyperparamsComponent', () => {
  let component: HyperparamsComponent;
  let fixture: ComponentFixture<HyperparamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HyperparamsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HyperparamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
