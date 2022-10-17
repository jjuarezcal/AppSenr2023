import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatdetallesPage } from './catdetalles.page';

describe('CatdetallesPage', () => {
  let component: CatdetallesPage;
  let fixture: ComponentFixture<CatdetallesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatdetallesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatdetallesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
