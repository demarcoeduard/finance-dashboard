import { Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { AuthFormComponent } from './auth-form/auth-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainAccountsComponent } from './main-accounts/main-accounts.component';
import { IncomeAccountsComponent } from './income-accounts/income-accounts.component';
import { ExpenseAccountsComponent } from './expense-accounts/expense-accounts.component';
import { TransferTransactionsComponent } from './transfer-transactions/transfer-transactions.component';
import { IncomeTransactionsComponent } from './income-transactions/income-transactions.component';
import { ExpenseTransactionsComponent } from './expense-transactions/expense-transactions.component';

export const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'auth-form', component: AuthFormComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'main-accounts', component: MainAccountsComponent },
  { path: 'income-accounts', component: IncomeAccountsComponent },
  { path: 'expense-accounts', component: ExpenseAccountsComponent }
  { path: 'transfer-transactions', component: TransferTransactionsComponent },
  { path: 'income-transactions', component: IncomeTransactionsComponent },
  { path: 'expense-transactions', component: ExpenseTransactionsComponent }
];
