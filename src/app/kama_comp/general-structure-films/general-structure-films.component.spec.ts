import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralStructureFilmsComponent } from './general-structure-films.component';

describe('GeneralStructureFilmsComponent', () => {
  let component: GeneralStructureFilmsComponent;
  let fixture: ComponentFixture<GeneralStructureFilmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralStructureFilmsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralStructureFilmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
