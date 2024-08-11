import { DecimalPipe } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FilterPipe } from '../filter.pipe';
import { Data } from '../services/data.model';
import { DemoService } from '../services/demo.service';
import { map, Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-transfer-transactions',
  standalone: true,
  imports: [DecimalPipe, FormsModule, FilterPipe],
  templateUrl: './transfer-transactions.component.html',
  styleUrl: './transfer-transactions.component.css'
})
export class TransferTransactionsComponent implements OnInit {
  search = '';
  router = inject(Router);
  alertType = '';
  deleteAlert = false;
  transactionIdx = NaN;
  NaN = NaN;
  isOpen = false;
  demoService = inject(DemoService);
  transfers!:Data['transactions']['transfer'];
  transactions!:Data['transactions']['transfer'];
  accounts!:Data['accounts']['main'];
  accountsData!:Data['accounts']['main'];
  subscription!:Subscription;
  destroyRef = inject(DestroyRef);

  constructor() {
    this.search = this.router.getCurrentNavigation()?.extras.state?.['data'];
  }

  ngOnInit(): void {
    this.subscription = this.demoService.demo$.pipe(
      tap(v => {
        this.accountsData = JSON.parse(JSON.stringify(v.accounts.main));
        this.accounts = JSON.parse(JSON.stringify(this.accountsData));
      }),
      map(v => v.transactions.transfer)
    ).subscribe(response => {
      this.transfers = response;

      this.transactions = this.transfers.map(v => ({
        source: v.source,
        amount: v.amount,
        receiver: v.receiver
      }));
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

    let sourceIdx = this.accounts.findIndex(v => v.name === source);
    let receiverIdx = this.accounts.findIndex(v => v.name === receiver);
    let sourceAmount = this.accounts[sourceIdx].balance + amount;
    let receiverAmount = this.accounts[receiverIdx].balance - amount;

    if (receiverAmount < 0) {
      this.alertType = 'funds';
      return;
    }

    this.demoService.onEditBalance('main', sourceIdx, sourceAmount);
    this.demoService.onEditBalance('main', receiverIdx, receiverAmount);
    this.demoService.onDeleteTransaction('transfer', this.transactionIdx);
    
    this.onOpenAlert(NaN);
  }

  onCloseAlert() {
    this.alertType = '';
  }

  onOpenForm() {
    this.isOpen = !this.isOpen;
  }

  onSubmit(form: NgForm) {
    let source = form.value.source;
    let amount = form.value.amount;
    let receiver = form.value.receiver;

    let sourceIdx = this.accounts.findIndex(v => v.name === source);
    let receiverIdx = this.accounts.findIndex(v => v.name === receiver);
    let sourceAmount = this.accounts[sourceIdx].balance - amount;
    let receiverAmount = this.accounts[receiverIdx].balance + amount;

    let data = {
      source: source,
      amount: amount,
      receiver: receiver
    }

    if (source === receiver) {
      this.alertType = 'account';
      return;
    } else if (sourceAmount < 0) {
      this.alertType = 'funds';
      return;
    }
    
    this.demoService.onCreateTransaction('transfer', data);
    this.demoService.onEditBalance('main', sourceIdx, sourceAmount);
    this.demoService.onEditBalance('main', receiverIdx, receiverAmount);

    this.onOpenForm();
  }
}
