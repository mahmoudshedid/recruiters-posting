import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostingsListComponent } from './postings-list.component';

describe('PostingsListComponent', () => {
  let component: PostingsListComponent;
  let fixture: ComponentFixture<PostingsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostingsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostingsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
