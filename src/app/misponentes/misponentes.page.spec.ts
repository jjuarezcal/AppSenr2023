import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisponentesPage } from './misponentes.page';

describe('MisponentesPage', () => {
  let component: MisponentesPage;
  let fixture: ComponentFixture<MisponentesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisponentesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisponentesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
