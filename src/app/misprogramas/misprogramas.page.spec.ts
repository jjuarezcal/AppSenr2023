import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisprogramasPage } from './misprogramas.page';

describe('MisprogramasPage', () => {
  let component: MisprogramasPage;
  let fixture: ComponentFixture<MisprogramasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisprogramasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisprogramasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
