import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateContentPageComponent } from './create-content-page.component';

describe('CreateContentPageComponent', () => {
  let component: CreateContentPageComponent;
  let fixture: ComponentFixture<CreateContentPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateContentPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateContentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
