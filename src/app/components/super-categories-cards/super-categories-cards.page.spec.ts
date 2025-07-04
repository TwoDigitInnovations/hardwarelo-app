import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SuperCategoriesCardsPage } from './super-categories-cards.page';

describe('SuperCategoriesCardsPage', () => {
  let component: SuperCategoriesCardsPage;
  let fixture: ComponentFixture<SuperCategoriesCardsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperCategoriesCardsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
