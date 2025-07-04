import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EssentialsCardPage } from './essentials-card.page';

describe('EssentialsCardPage', () => {
  let component: EssentialsCardPage;
  let fixture: ComponentFixture<EssentialsCardPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EssentialsCardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
