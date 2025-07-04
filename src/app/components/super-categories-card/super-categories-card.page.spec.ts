import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SuperCategoriesCardPage } from './super-categories-card.page';

describe('SuperCategoriesCardPage', () => {
  let component: SuperCategoriesCardPage;
  let fixture: ComponentFixture<SuperCategoriesCardPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperCategoriesCardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
