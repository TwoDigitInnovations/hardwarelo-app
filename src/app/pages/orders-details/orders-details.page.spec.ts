import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrdersDetailsPage } from './orders-details.page';

describe('OrdersDetailsPage', () => {
  let component: OrdersDetailsPage;
  let fixture: ComponentFixture<OrdersDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
