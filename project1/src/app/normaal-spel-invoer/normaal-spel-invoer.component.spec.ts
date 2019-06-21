import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NormaalSpelInvoerComponent } from './normaal-spel-invoer.component';

describe('NormaalSpelInvoerComponent', () => {
  let component: NormaalSpelInvoerComponent;
  let fixture: ComponentFixture<NormaalSpelInvoerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NormaalSpelInvoerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NormaalSpelInvoerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
