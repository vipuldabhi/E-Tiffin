import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdertiffinComponent } from './ordertiffin.component';

describe('OrdertiffinComponent', () => {
  let component: OrdertiffinComponent;
  let fixture: ComponentFixture<OrdertiffinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdertiffinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdertiffinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
