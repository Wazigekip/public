import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NieuwSpelComponent } from './nieuw-spel.component';

describe('NieuwSpelComponent', () => {
  let component: NieuwSpelComponent;
  let fixture: ComponentFixture<NieuwSpelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NieuwSpelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NieuwSpelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
