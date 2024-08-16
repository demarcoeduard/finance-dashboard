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
import { authGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'welcome' },
  { path: 'welcome', component: WelcomeComponent, data: {title: 'Welcome'}, canActivate: [authGuard] },
  { path: 'auth-form', component: AuthFormComponent, data: {title: 'Authentication'} },
  { path: 'dashboard', component: DashboardComponent, data: {title: 'Dashboard'} },
  { path: 'main-accounts', component: MainAccountsComponent, data: {title: 'Main'} },
  { path: 'income-accounts', component: IncomeAccountsComponent, data: {title: 'Income'} },
  { path: 'expense-accounts', component: ExpenseAccountsComponent, data: {title: 'Expense'} },
  { path: 'transfer-transactions', component: TransferTransactionsComponent, data: {title: 'Transfer'} },
  { path: 'income-transactions', component: IncomeTransactionsComponent, data: {title: 'Income'} },
  { path: 'expense-transactions', component: ExpenseTransactionsComponent, data: {title: 'Expense'} }
];
