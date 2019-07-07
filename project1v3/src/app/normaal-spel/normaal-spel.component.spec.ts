import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NormaalSpelComponent } from './normaal-spel.component';

describe('NormaalSpelComponent', () => {
  let component: NormaalSpelComponent;
  let fixture: ComponentFixture<NormaalSpelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NormaalSpelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NormaalSpelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
