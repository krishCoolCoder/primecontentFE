import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentTypePageComponent } from './content-type-page.component';

describe('ContentTypePageComponent', () => {
  let component: ContentTypePageComponent;
  let fixture: ComponentFixture<ContentTypePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentTypePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentTypePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
