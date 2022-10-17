import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OralesPage } from './orales.page';

describe('OralesPage', () => {
  let component: OralesPage;
  let fixture: ComponentFixture<OralesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OralesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OralesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
