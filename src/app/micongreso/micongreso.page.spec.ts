import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MicongresoPage } from './micongreso.page';

describe('MicongresoPage', () => {
  let component: MicongresoPage;
  let fixture: ComponentFixture<MicongresoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MicongresoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MicongresoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
