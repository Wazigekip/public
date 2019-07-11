import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DodentopicUitvoerComponent } from './dodentopic-uitvoer.component';

describe('DodentopicUitvoerComponent', () => {
  let component: DodentopicUitvoerComponent;
  let fixture: ComponentFixture<DodentopicUitvoerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DodentopicUitvoerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DodentopicUitvoerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
