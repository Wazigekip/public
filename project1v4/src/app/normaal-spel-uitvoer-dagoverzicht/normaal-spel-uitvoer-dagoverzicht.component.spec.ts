import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NormaalSpelUitvoerDagoverzichtComponent } from './normaal-spel-uitvoer-dagoverzicht.component';

describe('NormaalSpelUitvoerDagoverzichtComponent', () => {
  let component: NormaalSpelUitvoerDagoverzichtComponent;
  let fixture: ComponentFixture<NormaalSpelUitvoerDagoverzichtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NormaalSpelUitvoerDagoverzichtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NormaalSpelUitvoerDagoverzichtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
