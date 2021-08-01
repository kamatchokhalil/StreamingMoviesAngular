import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllOthersComponent } from './all-others.component';

describe('AllOthersComponent', () => {
  let component: AllOthersComponent;
  let fixture: ComponentFixture<AllOthersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllOthersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllOthersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
