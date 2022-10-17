import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizadoresdetailPage } from './organizadoresdetail.page';

describe('OrganizadoresdetailPage', () => {
  let component: OrganizadoresdetailPage;
  let fixture: ComponentFixture<OrganizadoresdetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizadoresdetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizadoresdetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
