import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OffersCardPage } from './offers-card.page';

describe('OffersCardPage', () => {
  let component: OffersCardPage;
  let fixture: ComponentFixture<OffersCardPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OffersCardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
