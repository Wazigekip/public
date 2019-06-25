import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpellenoverzichtComponent } from './spellenoverzicht.component';

describe('SpellenoverzichtComponent', () => {
  let component: SpellenoverzichtComponent;
  let fixture: ComponentFixture<SpellenoverzichtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpellenoverzichtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpellenoverzichtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
