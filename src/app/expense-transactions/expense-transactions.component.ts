import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expense-transactions',
  standalone: true,
  imports: [],
  templateUrl: './expense-transactions.component.html',
  styleUrl: './expense-transactions.component.css'
})
export class ExpenseTransactionsComponent {
  search = '';
  router = inject(Router);

  constructor() {
    this.search = this.router.getCurrentNavigation()?.extras.state?.['data'];
  }
}
