import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PantallaPage } from './pantalla.page';

describe('PantallaPage', () => {
  let component: PantallaPage;
  let fixture: ComponentFixture<PantallaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PantallaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PantallaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
