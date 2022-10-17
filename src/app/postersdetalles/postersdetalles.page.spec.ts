import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostersdetallesPage } from './postersdetalles.page';

describe('PostersdetallesPage', () => {
  let component: PostersdetallesPage;
  let fixture: ComponentFixture<PostersdetallesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostersdetallesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostersdetallesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
