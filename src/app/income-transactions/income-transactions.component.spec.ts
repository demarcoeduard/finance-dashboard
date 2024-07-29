import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeTransactionsComponent } from './income-transactions.component';

describe('IncomeTransactionsComponent', () => {
  let component: IncomeTransactionsComponent;
  let fixture: ComponentFixture<IncomeTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncomeTransactionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncomeTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
