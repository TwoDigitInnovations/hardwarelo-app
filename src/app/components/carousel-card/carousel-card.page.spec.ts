import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarouselCardPage } from './carousel-card.page';

describe('CarouselCardPage', () => {
  let component: CarouselCardPage;
  let fixture: ComponentFixture<CarouselCardPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselCardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
