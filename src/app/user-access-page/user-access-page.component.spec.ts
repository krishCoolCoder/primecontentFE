import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAccessPageComponent } from './user-access-page.component';

describe('UserAccessPageComponent', () => {
  let component: UserAccessPageComponent;
  let fixture: ComponentFixture<UserAccessPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserAccessPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAccessPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
