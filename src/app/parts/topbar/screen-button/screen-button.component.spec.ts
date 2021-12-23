import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenButtonComponent } from './screen-button.component';

describe('ScreenButtonComponent', () => {
  let component: ScreenButtonComponent;
  let fixture: ComponentFixture<ScreenButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScreenButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
