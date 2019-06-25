import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpelspelerslijstComponent } from './spelspelerslijst.component';

describe('SpelspelerslijstComponent', () => {
  let component: SpelspelerslijstComponent;
  let fixture: ComponentFixture<SpelspelerslijstComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpelspelerslijstComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpelspelerslijstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
