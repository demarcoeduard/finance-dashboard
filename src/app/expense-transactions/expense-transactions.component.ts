import { DecimalPipe } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FilterPipe } from '../filter.pipe';
import { DemoService } from '../services/demo.service';
import { Data } from '../services/data.model';
import { map, Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-expense-transactions',
  standalone: true,
  imports: [DecimalPipe, FormsModule, FilterPipe],
  templateUrl: './expense-transactions.component.html',
  styleUrl: './expense-transactions.component.css'
})
export class ExpenseTransactionsComponent implements OnInit {
  search = '';
  router = inject(Router);
  alertType = false;
  deleteAlert = false;
  transactionIdx = NaN;
  NaN = NaN;
  isOpen = false;
  demoService = inject(DemoService);
  expense!:Data['transactions']['expense'];
  transactions!:Data['transactions']['expense'];
  mainAccounts!:Data['accounts']['main'];
  expenseAccounts!:Data['accounts']['expense'];
  subscription!:Subscription;
  destroyRef = inject(DestroyRef);

  constructor() {
    this.search = this.router.getCurrentNavigation()?.extras.state?.['data'];
  }

  ngOnInit(): void {
    this.subscription = this.demoService.demo$.pipe(
      tap(v => {
        this.mainAccounts = JSON.parse(JSON.stringify(v.accounts.main));
        this.expenseAccounts = JSON.parse(JSON.stringify(v.accounts.expense));
      }),
      map(v => v.transactions.expense)
    ).subscribe(response => {
      this.expense = response;

      this.transactions = this.expense.map(v => ({
        source: v.source,
        amount: v.amount,
        receiver: v.receiver
      }))
    })

    this.destroyRef.onDestroy(() => this.subscription.unsubscribe());
  }

  onOpenAlert(idx: number) {
    this.deleteAlert = !this.deleteAlert;
    this.transactionIdx = idx;
  }

  onDelete() {
    let transaction = this.transactions[this.transactionIdx];
    let source = transaction.source;
    let amount = transaction.amount;
    let receiver = transaction.receiver;

    let sourceIdx = this.mainAccounts.findIndex(v => v.name === source);
    let receiverIdx = this.expenseAccounts.findIndex(v => v.name === receiver);
    let sourceAmount = this.mainAccounts[sourceIdx].balance + amount;
    let receiverAmount = this.expenseAccounts[receiverIdx].balance - amount;

    if (receiverAmount < 0) {
      this.alertType = true;
      return;
    }

    this.demoService.onEditBalance('main', sourceIdx, sourceAmount);
    this.demoService.onEditBalance('expense', receiverIdx, receiverAmount);
    this.demoService.onDeleteTransaction('expense', this.transactionIdx);

    this.onOpenAlert(NaN);
  }

  onCloseAlert() {
    this.alertType = false;
  }

  onOpenForm() {
    this.isOpen = !this.isOpen;
  }

  onSubmit(form: NgForm) {
    let source = form.value.source;
    let amount = form.value.amount;
    let receiver = form.value.receiver;

    let sourceIdx = this.mainAccounts.findIndex(v => v.name === source);
    let receiverIdx = this.expenseAccounts.findIndex(v => v.name === receiver);
    let sourceAmount = this.mainAccounts[sourceIdx].balance - amount;
    let receiverAmount = this.expenseAccounts[receiverIdx].balance + amount;

    if (sourceAmount < 0) {
      this.alertType = true;
      return;
    }
   
    let data = {
      source: source,
      amount: amount,
      receiver: receiver
    }
 
    this.demoService.onEditBalance('main', sourceIdx, sourceAmount);
    this.demoService.onEditBalance('expense', receiverIdx, receiverAmount);
    this.demoService.onCreateTransaction('expense', data);

    this.onOpenForm();
  }
}
