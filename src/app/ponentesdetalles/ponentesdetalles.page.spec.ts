import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PonentesdetallesPage } from './ponentesdetalles.page';

describe('PonentesdetallesPage', () => {
  let component: PonentesdetallesPage;
  let fixture: ComponentFixture<PonentesdetallesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PonentesdetallesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PonentesdetallesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
