import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomslistPage } from './roomslist.page';

describe('RoomslistPage', () => {
  let component: RoomslistPage;
  let fixture: ComponentFixture<RoomslistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomslistPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomslistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
