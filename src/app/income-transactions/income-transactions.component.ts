import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-income-transactions',
  standalone: true,
  imports: [],
  templateUrl: './income-transactions.component.html',
  styleUrl: './income-transactions.component.css'
})
export class IncomeTransactionsComponent {
  search = '';
  router = inject(Router);

  constructor() {
    this.search = this.router.getCurrentNavigation()?.extras.state?.['data'];
  }
}
