import { DecimalPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FilterPipe } from '../filter.pipe';

@Component({
  selector: 'app-transfer-transactions',
  standalone: true,
  imports: [DecimalPipe, FormsModule, FilterPipe],
  templateUrl: './transfer-transactions.component.html',
  styleUrl: './transfer-transactions.component.css'
})
export class TransferTransactionsComponent{
  transactions = [
    {
      source: 'account-name1',
      amount: 100000000,
      receiver: 'account-name1.5'
    },
    {
      source: 'account-name2',
      amount: 100000000,
      receiver: 'account-name2.5'
    },
    {
      source: 'account-name3',
      amount: 100000000,
      receiver: 'account-name3.5'
    },
    {
      source: 'account-name4',
      amount: 100000000,
      receiver: 'account-name4.5'
    },
    {
      source: 'account-name5',
      amount: 100000000,
      receiver: 'account-name5.5'
    },
    {
      source: 'account-name6',
      amount: 100000000,
      receiver: 'account-name6.5'
    },
  ];
  search = '';
  router = inject(Router);
  alertType = '';
  deleteAlert = false;
  transactionIdx:number|null = NaN;
  isOpen = false;

  constructor() {
    this.search = this.router.getCurrentNavigation()?.extras.state?.['data'];
  }

  onOpenAlert(idx: number|null) {
    this.deleteAlert = !this.deleteAlert;
    this.transactionIdx = idx;
  }

  onDelete() {
    this.transactions.splice(this.transactionIdx!, 1);
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

    this.transactions.push(
      {
        source: source,
        amount: amount,
        receiver: receiver
      }
    );

    this.onOpenForm();
  }
}
