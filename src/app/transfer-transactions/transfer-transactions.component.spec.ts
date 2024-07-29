import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferTransactionsComponent } from './transfer-transactions.component';

describe('TransferTransactionsComponent', () => {
  let component: TransferTransactionsComponent;
  let fixture: ComponentFixture<TransferTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransferTransactionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransferTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
