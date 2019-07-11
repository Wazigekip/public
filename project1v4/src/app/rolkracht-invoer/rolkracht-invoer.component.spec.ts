import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RolkrachtInvoerComponent } from './rolkracht-invoer.component';

describe('RolkrachtInvoerComponent', () => {
  let component: RolkrachtInvoerComponent;
  let fixture: ComponentFixture<RolkrachtInvoerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RolkrachtInvoerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolkrachtInvoerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
