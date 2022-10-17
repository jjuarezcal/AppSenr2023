import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatpreguntasPage } from './catpreguntas.page';

describe('CatpreguntasPage', () => {
  let component: CatpreguntasPage;
  let fixture: ComponentFixture<CatpreguntasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatpreguntasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatpreguntasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
