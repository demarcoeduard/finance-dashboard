import { DecimalPipe } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FilterPipe } from '../filter.pipe';
import { DemoService } from '../services/demo.service';
import { Data } from '../services/data.model';
import { map, Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-income-transactions',
  standalone: true,
  imports: [DecimalPipe, FormsModule, FilterPipe],
  templateUrl: './income-transactions.component.html',
  styleUrl: './income-transactions.component.css'
})
export class IncomeTransactionsComponent implements OnInit {
  search = '';
  router = inject(Router);
  alertType = false;
  deleteAlert = false;
  transactionIdx = NaN;
  NaN = NaN;
  isOpen = false;
  demoService = inject(DemoService);
  incomes!:Data['transactions']['income'];
  transactions!:Data['transactions']['income'];
  mainAccounts!:Data['accounts']['main']
  incomeAccounts!:Data['accounts']['income'];
  subscription!:Subscription;
  destroyRef = inject(DestroyRef);

  constructor() {
    this.search = this.router.getCurrentNavigation()?.extras.state?.['data'];
  }

  ngOnInit(): void {
    this.subscription = this.demoService.demo$.pipe(
      tap(v => {
        this.mainAccounts = JSON.parse(JSON.stringify(v.accounts.main));
        this.incomeAccounts = JSON.parse(JSON.stringify(v.accounts.income));
      }),
      map(v => v.transactions.income)
    ).subscribe(response => {
      this.incomes = response;

      this.transactions = this.incomes.map(v => ({
        source: v.source,
        amount: v.amount,
        receiver: v.receiver
      }));
    });

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

    let sourceIdx = this.incomeAccounts.findIndex(v => v.name === source);
    let receiverIdx = this.mainAccounts.findIndex(v => v.name === receiver);
    let sourceAmount = this.incomeAccounts[sourceIdx].balance - amount;
    let receiverAmount = this.mainAccounts[receiverIdx].balance - amount;

    if (sourceAmount < 0 || receiverAmount < 0) {
      this.alertType = true;
      return;
    }

    this.demoService.onEditBalance('income', sourceIdx, sourceAmount);
    this.demoService.onEditBalance('main', receiverIdx, receiverAmount);
    this.demoService.onDeleteTransaction('income', this.transactionIdx);

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

    let sourceIdx = this.incomeAccounts.findIndex(v => v.name === source);
    let receiverIdx = this.mainAccounts.findIndex(v => v.name === receiver);
    let sourceAmount = this.incomeAccounts[sourceIdx].balance + amount;
    let receiverAmount = this.mainAccounts[receiverIdx].balance + amount;

    let data = {
      source: source,
      amount: amount,
      receiver: receiver
    }

    this.demoService.onEditBalance('income', sourceIdx, sourceAmount);
    this.demoService.onEditBalance('main', receiverIdx, receiverAmount);
    this.demoService.onCreateTransaction('income', data);

    this.onOpenForm();
  }
}
