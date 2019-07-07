import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnkeldoelwitkrachtInvoerComponent } from './enkeldoelwitkracht-invoer.component';

describe('EnkeldoelwitkrachtInvoerComponent', () => {
  let component: EnkeldoelwitkrachtInvoerComponent;
  let fixture: ComponentFixture<EnkeldoelwitkrachtInvoerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnkeldoelwitkrachtInvoerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnkeldoelwitkrachtInvoerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
