import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifySupplierComponent } from './modify-supplier.component';

describe('ModifySupplierComponent', () => {
  let component: ModifySupplierComponent;
  let fixture: ComponentFixture<ModifySupplierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifySupplierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifySupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
