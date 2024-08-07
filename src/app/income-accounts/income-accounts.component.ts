import { DecimalPipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-income-accounts',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './income-accounts.component.html',
  styleUrl: './income-accounts.component.css'
})
export class IncomeAccountsComponent {
  accounts = [
    {
      name: 'account-name',
      balance: 100000000
    },
    {
      name: 'account-name',
      balance: 100000000
    },
    {
      name: 'account-name',
      balance: 100000000
    },
    {
      name: 'account-name',
      balance: 100000000
    },
    {
      name: 'account-name',
      balance: 100000000
    },
    {
      name: 'account-name',
      balance: 100000000
    },
  ]
}
