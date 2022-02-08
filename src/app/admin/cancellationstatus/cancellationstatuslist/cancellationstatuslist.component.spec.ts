import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancellationstatuslistComponent } from './cancellationstatuslist.component';

describe('CancellationstatuslistComponent', () => {
  let component: CancellationstatuslistComponent;
  let fixture: ComponentFixture<CancellationstatuslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancellationstatuslistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CancellationstatuslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
