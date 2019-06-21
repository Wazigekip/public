import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NormaalSpelUitvoerForumtopicComponent } from './normaal-spel-uitvoer-forumtopic.component';

describe('NormaalSpelUitvoerForumtopicComponent', () => {
  let component: NormaalSpelUitvoerForumtopicComponent;
  let fixture: ComponentFixture<NormaalSpelUitvoerForumtopicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NormaalSpelUitvoerForumtopicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NormaalSpelUitvoerForumtopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
