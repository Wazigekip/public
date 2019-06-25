import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NormaalSpelUitvoerOverzichtComponent } from './normaal-spel-uitvoer-overzicht.component';

describe('NormaalSpelUitvoerOverzichtComponent', () => {
  let component: NormaalSpelUitvoerOverzichtComponent;
  let fixture: ComponentFixture<NormaalSpelUitvoerOverzichtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NormaalSpelUitvoerOverzichtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NormaalSpelUitvoerOverzichtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
