import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRolePageComponent } from './user-role-page.component';

describe('UserRolePageComponent', () => {
  let component: UserRolePageComponent;
  let fixture: ComponentFixture<UserRolePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserRolePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserRolePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
