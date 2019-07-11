import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfotopicUitvoerComponent } from './infotopic-uitvoer.component';

describe('InfotopicUitvoerComponent', () => {
  let component: InfotopicUitvoerComponent;
  let fixture: ComponentFixture<InfotopicUitvoerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfotopicUitvoerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfotopicUitvoerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
