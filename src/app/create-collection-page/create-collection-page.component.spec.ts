import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCollectionPageComponent } from './create-collection-page.component';

describe('CreateCollectionPageComponent', () => {
  let component: CreateCollectionPageComponent;
  let fixture: ComponentFixture<CreateCollectionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCollectionPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCollectionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
