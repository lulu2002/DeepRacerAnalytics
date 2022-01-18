import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HugeUploadComponent } from './huge-upload.component';

describe('HugeUploadComponent', () => {
  let component: HugeUploadComponent;
  let fixture: ComponentFixture<HugeUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HugeUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HugeUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
