import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NamenlijstkrachtInvoerComponent } from './namenlijstkracht-invoer.component';

describe('NamenlijstkrachtInvoerComponent', () => {
  let component: NamenlijstkrachtInvoerComponent;
  let fixture: ComponentFixture<NamenlijstkrachtInvoerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NamenlijstkrachtInvoerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NamenlijstkrachtInvoerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
