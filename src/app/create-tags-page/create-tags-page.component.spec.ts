import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTagsPageComponent } from './create-tags-page.component';

describe('CreateTagsPageComponent', () => {
  let component: CreateTagsPageComponent;
  let fixture: ComponentFixture<CreateTagsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateTagsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTagsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
