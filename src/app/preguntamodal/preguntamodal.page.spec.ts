import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreguntamodalPage } from './preguntamodal.page';

describe('PreguntamodalPage', () => {
  let component: PreguntamodalPage;
  let fixture: ComponentFixture<PreguntamodalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreguntamodalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreguntamodalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
