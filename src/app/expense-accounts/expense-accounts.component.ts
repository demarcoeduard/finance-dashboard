import { DecimalPipe } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { Data } from '../services/data.model';
import { map, Subscription } from 'rxjs';
import { DemoService } from '../services/demo.service';

@Component({
  selector: 'app-expense-accounts',
  standalone: true,
  imports: [DecimalPipe, FormsModule],
  templateUrl: './expense-accounts.component.html',
  styleUrl: './expense-accounts.component.css'
})
export class ExpenseAccountsComponent implements OnInit {
  formType = '';
  alertType = '';
  accountName = '';
  accountBalance!:number;
  accountIdx = NaN;
  router = inject(Router);
  demoService = inject(DemoService);
  accounts:Data['accounts']['expense'] = [];
  data:Data['accounts']['expense'] = [];
  subscription!:Subscription;
  destroyRef = inject(DestroyRef);
  
  ngOnInit(): void {
    this.subscription = this.demoService.demo$.pipe(
      map(v => v.accounts.expense)
    ).subscribe(response => {
      this.data = response;

      this.accounts = this.data.map(account => ({
        name: account.name,
        balance: account.balance
      }));
    });

    this.destroyRef.onDestroy(() => this.subscription.unsubscribe());
  }

  onShowActions(idx: number) {
    if (this.accountIdx === idx) {
      this.accountIdx = NaN;
    } else {
      this.accountIdx = idx;
    }
  }

  onCloseAlert() {
    this.alertType = '';
    this.onShowActions(NaN);
  }

  onOpenAlert() {
    this.alertType = 'deletion';
  }

  onDeleteAccount() {
    this.demoService.onDeleteAccount('expense', this.accountIdx);
    this.onCloseAlert();
    this.onShowActions(NaN);
  }

  onShowTransactions() {
    let navigationExtras: NavigationExtras = {
      state: { data: this.accounts[this.accountIdx!].name}
    }

    this.router.navigate(['/expense-transactions'], navigationExtras);
  }

  onOpenForm(type: string) {
    if (type === 'create') {
      this.onShowActions(NaN);
      this.accountName = '';
      this.accountBalance = NaN;
    }
    
    this.formType = type;

    this.accountName = this.accounts[this.accountIdx!].name;
    this.accountBalance = this.accounts[this.accountIdx!].balance;
  }

  onSubmit(form: NgForm) {
    let name:string = form.value.name;
    let balance:number = form.value.balance;
    let data = { name: name, balance: balance };

    if(this.formType === 'create') {
      this.demoService.onCreateAccount('expense', data);
    } else {
      this.demoService.onEditAccount('expense', this.accountIdx, data);
    }

    this.onShowActions(NaN);
    this.onOpenForm('');
  }
}
