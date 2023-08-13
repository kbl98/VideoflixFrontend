import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetPwComponent } from './get-pw.component';

describe('GetPwComponent', () => {
  let component: GetPwComponent;
  let fixture: ComponentFixture<GetPwComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetPwComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetPwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
