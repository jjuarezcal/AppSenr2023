import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RespondermodalPage } from './respondermodal.page';

describe('RespondermodalPage', () => {
  let component: RespondermodalPage;
  let fixture: ComponentFixture<RespondermodalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RespondermodalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RespondermodalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
