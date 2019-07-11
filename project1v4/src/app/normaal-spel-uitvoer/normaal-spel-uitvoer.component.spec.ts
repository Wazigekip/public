import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NormaalSpelUitvoerComponent } from './normaal-spel-uitvoer.component';

describe('NormaalSpelUitvoerComponent', () => {
  let component: NormaalSpelUitvoerComponent;
  let fixture: ComponentFixture<NormaalSpelUitvoerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NormaalSpelUitvoerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NormaalSpelUitvoerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
