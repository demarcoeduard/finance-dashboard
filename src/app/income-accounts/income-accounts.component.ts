import { DecimalPipe } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { Data } from '../services/data.model';
import { DemoService } from '../services/demo.service';
import { map, Subscription } from 'rxjs';

@Component({
  selector: 'app-income-accounts',
  standalone: true,
  imports: [DecimalPipe, FormsModule],
  templateUrl: './income-accounts.component.html',
  styleUrl: './income-accounts.component.css'
})
export class IncomeAccountsComponent implements OnInit {
  formType = '';
  alertType = '';
  accountName = '';
  accountBalance!:number;
  accountIdx = NaN;
  router = inject(Router);
  accounts:Data['accounts']['income'] = [];
  data:Data['accounts']['income'] = [];
  demoService = inject(DemoService);
  subscription!:Subscription;
  destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.subscription = this.demoService.demo$.pipe(
      map(v => v.accounts.income)
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
    this.demoService.onDeleteAccount('income', this.accountIdx);
    this.onCloseAlert();
    this.onShowActions(NaN);
  }

  onShowTransactions() {
    let navigationExtras: NavigationExtras = {
      state: { data: this.accounts[this.accountIdx!].name}
    }

    this.router.navigate(['/income-transactions'], navigationExtras);
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
      this.demoService.onCreateAccount('income', data);
    } else {
      this.demoService.onEditAccount('income', this.accountIdx, data);
    }

    this.onShowActions(NaN);
    this.onOpenForm('');
  }
}
