import { DecimalPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { DemoService } from '../services/demo.service';

@Component({
  selector: 'app-main-accounts',
  standalone: true,
  imports: [FormsModule, DecimalPipe],
  templateUrl: './main-accounts.component.html',
  styleUrl: './main-accounts.component.css'
})
export class MainAccountsComponent {
  popup = 0;
  formType = '';
  savings = 100000000;
  budget = 200000000;
  goal = 300000000;
  goalTarget = 100000000;
  balance = 0;
  targetBalance = 0;
  router = inject(Router);
  demoService = inject(DemoService);

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
    if (this.formType === 'savings') {
      this.savings = form.value.balance;
    } else if (this.formType === 'budget') {
      this.budget = form.value.balance;
    } else {
      this.goal = form.value.balance;
      this.goalTarget = form.value.targetBalance;
    }

    this.onCloseForm();
  }
}
