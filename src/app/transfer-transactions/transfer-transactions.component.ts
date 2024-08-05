import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transfer-transactions',
  standalone: true,
  imports: [],
  templateUrl: './transfer-transactions.component.html',
  styleUrl: './transfer-transactions.component.css'
})
export class TransferTransactionsComponent{
  search = '';
  router = inject(Router);

  constructor() {
    this.search = this.router.getCurrentNavigation()?.extras.state?.['data'];
  }
}
