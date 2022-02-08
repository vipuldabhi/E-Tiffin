import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactinfoListComponent } from './contactinfo-list.component';

describe('ContactinfoListComponent', () => {
  let component: ContactinfoListComponent;
  let fixture: ComponentFixture<ContactinfoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactinfoListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactinfoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
