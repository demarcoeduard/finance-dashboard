import { DecimalPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-expense-accounts',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './expense-accounts.component.html',
  styleUrl: './expense-accounts.component.css'
})
export class ExpenseAccountsComponent {
  formType = '';
  alertType = '';
  accountIdx: null|number = null;
  router = inject(Router);
  accounts = [
    {
      name: 'account-name1',
      balance: 100000000
    },
    {
      name: 'account-name2',
      balance: 100000000
    },
    {
      name: 'account-name3',
      balance: 100000000
    },
    {
      name: 'account-name4',
      balance: 100000000
    },
    {
      name: 'account-name5',
      balance: 100000000
    },
    {
      name: 'account-name6',
      balance: 100000000
    },
  ]

  onShowActions(idx: number|null) {
    if (this.accountIdx === idx) {
      this.accountIdx = null;
    } else {
      this.accountIdx = idx;
    }
  }

  onCloseAlert() {
    this.alertType = '';
    this.onShowActions(null);
  }

  onOpenAlert() {
    this.alertType = 'deletion';
  }

  onDeleteAccount() {
    this.accounts.splice(this.accountIdx!, 1);
    this.onCloseAlert();
    this.onShowActions(null);
  }

  onShowTransactions() {
    let navigationExtras: NavigationExtras = {
      state: { data: this.accounts[this.accountIdx!].name}
    }

    this.router.navigate(['/expense-transactions'], navigationExtras);
  }

  onOpenForm(type: string) {
    this.formType = type;
    this.onShowActions(null);
  }
}
