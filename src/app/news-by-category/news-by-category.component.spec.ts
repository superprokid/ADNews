import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsByCategoryComponent } from './news-by-category.component';

describe('NewsByCategoryComponent', () => {
  let component: NewsByCategoryComponent;
  let fixture: ComponentFixture<NewsByCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsByCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsByCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
