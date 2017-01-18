/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TopikComponent } from './topik.component';

describe('TopikComponent', () => {
  let component: TopikComponent;
  let fixture: ComponentFixture<TopikComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopikComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
