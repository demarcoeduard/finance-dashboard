import { DecimalPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-income-transactions',
  standalone: true,
  imports: [DecimalPipe, FormsModule],
  templateUrl: './income-transactions.component.html',
  styleUrl: './income-transactions.component.css'
})
export class IncomeTransactionsComponent {
  transactions = [
    {
      source: 'account-name1',
      amount: 100000000,
      receiver: 'account-name1.5'
    },
    {
      source: 'account-name2',
      amount: 100000000,
      receiver: 'account-name2.5'
    },
    {
      source: 'account-name3',
      amount: 100000000,
      receiver: 'account-name3.5'
    },
    {
      source: 'account-name4',
      amount: 100000000,
      receiver: 'account-name4.5'
    },
    {
      source: 'account-name5',
      amount: 100000000,
      receiver: 'account-name5.5'
    },
    {
      source: 'account-name6',
      amount: 100000000,
      receiver: 'account-name6.5'
    },
  ];
  search = '';
  router = inject(Router);

  constructor() {
    this.search = this.router.getCurrentNavigation()?.extras.state?.['data'];
  }

  onSubmit(form: NgForm) {
    
  }
}
