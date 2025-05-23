import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUserRolePageComponent } from './create-user-role-page.component';

describe('CreateUserRolePageComponent', () => {
  let component: CreateUserRolePageComponent;
  let fixture: ComponentFixture<CreateUserRolePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateUserRolePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUserRolePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
