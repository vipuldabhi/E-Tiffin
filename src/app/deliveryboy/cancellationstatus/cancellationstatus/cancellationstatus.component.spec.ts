import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancellationstatusComponent } from './cancellationstatus.component';

describe('CancellationstatusComponent', () => {
  let component: CancellationstatusComponent;
  let fixture: ComponentFixture<CancellationstatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancellationstatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CancellationstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
