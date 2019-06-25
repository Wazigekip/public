import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpelerslijstComponent } from './spelerslijst.component';

describe('SpelerslijstComponent', () => {
  let component: SpelerslijstComponent;
  let fixture: ComponentFixture<SpelerslijstComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpelerslijstComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpelerslijstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
