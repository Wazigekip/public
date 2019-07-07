import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RolberichtenUitvoerComponent } from './rolberichten-uitvoer.component';

describe('RolberichtenUitvoerComponent', () => {
  let component: RolberichtenUitvoerComponent;
  let fixture: ComponentFixture<RolberichtenUitvoerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RolberichtenUitvoerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolberichtenUitvoerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
