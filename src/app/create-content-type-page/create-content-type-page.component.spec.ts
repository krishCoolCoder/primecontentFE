import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateContentTypePageComponent } from './create-content-type-page.component';

describe('CreateContentTypePageComponent', () => {
  let component: CreateContentTypePageComponent;
  let fixture: ComponentFixture<CreateContentTypePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateContentTypePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateContentTypePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
