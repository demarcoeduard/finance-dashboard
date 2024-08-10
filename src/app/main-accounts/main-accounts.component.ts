import { DecimalPipe } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { DemoService } from '../services/demo.service';
import { map, Subscription } from 'rxjs';
import { Data } from '../services/data.model';

@Component({
  selector: 'app-main-accounts',
  standalone: true,
  imports: [FormsModule, DecimalPipe],
  templateUrl: './main-accounts.component.html',
  styleUrl: './main-accounts.component.css'
})
export class MainAccountsComponent implements OnInit{
  popup = 0;
  formType = '';
  savings = NaN;
  budget = NaN;
  goal = NaN;
  goalTarget = NaN;
  balance = NaN;
  targetBalance = NaN;
  router = inject(Router);
  demoService = inject(DemoService);
  accounts!:Data['accounts']['main'];
  subscription!: Subscription;
  destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.subscription = this.demoService.demo$.pipe(
      map(v => v.accounts.main)
    ).subscribe(
      data => this.accounts = data
    );

    this.savings = this.accounts.savings.balance;
    this.budget = this.accounts.budget.balance;
    this.goal = this.accounts.goal.balance;
    this.goalTarget = this.accounts.goal.target;

    this.destroyRef.onDestroy(() => this.subscription.unsubscribe());
  }

  onShowPopup(id: number) {
    if (this.popup === id) {
      this.popup = 0;
    } else {
      this.popup = id;
    }
  }

  onOpenForm(formType: string) {
    this.formType = formType;
    if (formType === 'savings') {
      this.balance = this.savings;
    } else if (formType === 'budget') {
      this.balance = this.budget;
    } else {
      this.balance = this.goal;
      this.targetBalance = this.goalTarget;
    }
  }

  onCloseForm() {
    this.formType = '';
    this.popup = 0;
  }

  onShowTransactions(name: string, type: string) {
    let path = '';

    if (type === 'transfer') {
      path = '/transfer-transactions';
    } else if (type === 'income') {
      path = '/income-transactions';
    } else {
      path = '/expense-transactions';
    }

    const navigationExtras: NavigationExtras = {
      state: { data: name }
    };

    this.router.navigate([path], navigationExtras);
  }

  onSubmit(form: NgForm) {
    let balance = form.value.balance;
    let targetBalance = form.value.targetBalance;
    let newData: { balance: number, target?: number} = { balance };

    if (this.formType === 'savings') {
      this.savings = balance;
    } else if (this.formType === 'budget') {
      this.budget = balance;
    } else {
      this.goal = balance;
      this.goalTarget = targetBalance;
      newData.target = targetBalance;
    }

    this.demoService.onChangeMainAccounts(this.formType, newData);

    this.onCloseForm();
  }
}
