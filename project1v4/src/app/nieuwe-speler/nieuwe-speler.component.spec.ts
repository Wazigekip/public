import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NieuweSpelerComponent } from './nieuwe-speler.component';

describe('NieuweSpelerComponent', () => {
  let component: NieuweSpelerComponent;
  let fixture: ComponentFixture<NieuweSpelerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NieuweSpelerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NieuweSpelerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
