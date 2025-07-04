import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoriesCardPage } from './categories-card.page';

describe('CategoriesCardPage', () => {
  let component: CategoriesCardPage;
  let fixture: ComponentFixture<CategoriesCardPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesCardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
