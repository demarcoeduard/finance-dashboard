import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseTransactionsComponent } from './expense-transactions.component';

describe('ExpenseTransactionsComponent', () => {
  let component: ExpenseTransactionsComponent;
  let fixture: ComponentFixture<ExpenseTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpenseTransactionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpenseTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
