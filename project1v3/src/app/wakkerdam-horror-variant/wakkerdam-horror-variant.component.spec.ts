import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WakkerdamHorrorVariantComponent } from './wakkerdam-horror-variant.component';

describe('WakkerdamHorrorVariantComponent', () => {
  let component: WakkerdamHorrorVariantComponent;
  let fixture: ComponentFixture<WakkerdamHorrorVariantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WakkerdamHorrorVariantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WakkerdamHorrorVariantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
