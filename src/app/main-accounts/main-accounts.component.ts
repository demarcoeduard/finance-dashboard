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
    ).subscribe(data => {
      this.accounts = data;

      this.savings = this.accounts[0].balance;
      this.budget = this.accounts[1].balance;
      this.goal = this.accounts[2].balance;
      this.goalTarget = this.accounts[2].target;
    });

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
    let name = this.formType[0].toUpperCase() + this.formType.slice(1);
    let idx = this.accounts.findIndex(v => v.name === name);
    let newData: {name: string, balance: number, target?: number} = { name, balance };

    if (this.formType === 'goal') {
      newData.target = targetBalance;
    }

    this.demoService.onEditAccount('main', idx, newData);

    this.onCloseForm();
  }
}
