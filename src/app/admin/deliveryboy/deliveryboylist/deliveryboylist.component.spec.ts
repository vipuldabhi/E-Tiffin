import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryboylistComponent } from './deliveryboylist.component';

describe('DeliveryboylistComponent', () => {
  let component: DeliveryboylistComponent;
  let fixture: ComponentFixture<DeliveryboylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryboylistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryboylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
