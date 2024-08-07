import { DecimalPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-income-accounts',
  standalone: true,
  imports: [DecimalPipe, FormsModule],
  templateUrl: './income-accounts.component.html',
  styleUrl: './income-accounts.component.css'
})
export class IncomeAccountsComponent {
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

    this.router.navigate(['/income-transactions'], navigationExtras);
  }

  onOpenForm(type: string) {
    this.formType = type;
  }

  onSubmit(form: NgForm) {
    let name:string = form.value.name;
    let balance:number = form.value.balance;

    if(this.formType === 'create') {
      this.accounts.push(
        {
          name: name,
          balance: balance
        }
      )
    } else {
      this.accounts[this.accountIdx!].name = name;
      this.accounts[this.accountIdx!].balance = balance;
    }

    this.onOpenForm('');
    this.onShowActions(null);
  }
}
