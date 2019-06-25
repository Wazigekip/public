import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NormaalSpelUitvoerBeginComponent } from './normaal-spel-uitvoer-begin.component';

describe('NormaalSpelUitvoerBeginComponent', () => {
  let component: NormaalSpelUitvoerBeginComponent;
  let fixture: ComponentFixture<NormaalSpelUitvoerBeginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NormaalSpelUitvoerBeginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NormaalSpelUitvoerBeginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
