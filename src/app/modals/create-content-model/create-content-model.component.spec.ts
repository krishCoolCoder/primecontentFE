import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateContentModelComponent } from './create-content-model.component';

describe('CreateContentModelComponent', () => {
  let component: CreateContentModelComponent;
  let fixture: ComponentFixture<CreateContentModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateContentModelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateContentModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
