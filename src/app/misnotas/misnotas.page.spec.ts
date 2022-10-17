import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisnotasPage } from './misnotas.page';

describe('MisnotasPage', () => {
  let component: MisnotasPage;
  let fixture: ComponentFixture<MisnotasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisnotasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisnotasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
