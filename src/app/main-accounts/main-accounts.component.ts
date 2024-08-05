import { DecimalPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';

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
  }

  onShowTransfers(name: string) {
    const navigationExtras: NavigationExtras = {
      state: { data: name}
    };
    this.router.navigate(['/transfer-transactions'], navigationExtras);
  }

  onShowIncomes(name: string) {
    const navigationExtras: NavigationExtras = {
      state: { data: name }
    };
    this.router.navigate(['/income-transactions'], navigationExtras);
  }

  onShowExpenses(name: string) {
    const navigationExtras: NavigationExtras = {
      state: { data: name }
    };
    this.router.navigate(['/expense-transactions'], navigationExtras);
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
