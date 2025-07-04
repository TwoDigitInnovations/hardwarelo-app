import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SuperCategoriesPage } from './super-categories.page';

describe('SuperCategoriesPage', () => {
  let component: SuperCategoriesPage;
  let fixture: ComponentFixture<SuperCategoriesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperCategoriesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
