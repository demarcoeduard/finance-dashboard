import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeAccountsComponent } from './income-accounts.component';

describe('IncomeAccountsComponent', () => {
  let component: IncomeAccountsComponent;
  let fixture: ComponentFixture<IncomeAccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncomeAccountsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncomeAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
