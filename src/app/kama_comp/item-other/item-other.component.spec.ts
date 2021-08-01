import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemOtherComponent } from './item-other.component';

describe('ItemOtherComponent', () => {
  let component: ItemOtherComponent;
  let fixture: ComponentFixture<ItemOtherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemOtherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemOtherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
