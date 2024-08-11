import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Data } from './data.model';

@Injectable({
  providedIn: 'root'
})
export class DemoService {
  private demo:Data = {
    accounts: {
      main: [
        {
          name: 'Savings',
          balance: 5000
        },
        {
          name: 'Budget',
          balance: 1500
        },
        {
          name: 'Goal',
          balance: 3000,
          target: 5000
        }
      ],
      income: [
        {
          name: 'Salary',
          balance: 3000
        },
        {
          name: 'Freelance',
          balance: 1500
        },
        {
          name: 'Investment Returns',
          balance: 1000
        },
        {
          name: 'Rental Income',
          balance: 1200
        },
        {
          name: 'Side Business',
          balance: 800
        },
        {
          name: 'Dividends',
          balance: 600
        }
      ],
      expense: [
        {
          name: 'Rent',
          balance: 1200
        },
        {
          name: 'Groceries',
          balance: 400
        },
        {
          name: 'Utilities',
          balance: 250
        },
        {
          name: 'Transportation',
          balance: 150
        },
        {
          name: 'Insurance',
          balance: 300
        },
        {
          name: 'Entertainment',
          balance: 200
        }
      ]
    },
    transactions: {
      transfer: [
        {
          source: 'Savings',
          amount: 500,
          receiver: 'Budget'
        },
        {
          source: 'Budget',
          amount: 200,
          receiver: 'Savings'
        },
        {
          source: 'Budget',
          amount: 300,
          receiver: 'Goal'
        },
        {
          source: 'Goal',
          amount: 100,
          receiver: 'Savings'
        },
        {
          source: 'Savings',
          amount: 1000,
          receiver: 'Goal'
        },
        {
          source: 'Budget',
          amount: 500,
          receiver: 'Savings'
        }
      ],
      income: [
        {
          source: 'Salary',
          amount: 3000,
          receiver: 'Savings'
        },
        {
          source: 'Freelance',
          amount: 1500,
          receiver: 'Budget'
        },
        {
          source: 'Investment Returns',
          amount: 1000,
          receiver: 'Goal'
        },
        {
          source: 'Rental Income',
          amount: 1200,
          receiver: 'Savings'
        },
        {
          source: 'Side Business',
          amount: 800,
          receiver: 'Budget'
        },
        {
          source: 'Dividends',
          amount: 600,
          receiver: 'Goal'
        }
      ],
      expense: [
        {
          source: 'Budget',
          amount: 1200,
          receiver: 'Rent'
        },
        {
          source: 'Savings',
          amount: 400,
          receiver: 'Groceries'
        },
        {
          source: 'Budget',
          amount: 250,
          receiver: 'Utilities'
        },
        {
          source: 'Savings',
          amount: 150,
          receiver: 'Transportation'
        },
        {
          source: 'Budget',
          amount: 300,
          receiver: 'Insurance'
        },
        {
          source: 'Savings',
          amount: 200,
          receiver: 'Entertainment'
        }
      ]
    }
  };
  private demoSubject = new BehaviorSubject(this.demo);
  public demo$ = this.demoSubject.asObservable();  

  constructor() { }

  onCreateAccount(type: string, data: any) {
    let newData = this.demoSubject.value;

    if (type === 'income') {
      newData.accounts.income.push(data);
    } else {
      newData.accounts.expense.push(data);
    }

    this.demoSubject.next(newData);
  }

  onEditAccount(type: string, idx: number, data: any) {
    let newData = this.demoSubject.value;
    let oldName = '';

    if (type === 'main') {
      newData.accounts.main[idx] = data;
    } else if (type === 'income') {
      oldName = newData.accounts.income[idx].name;

      newData.accounts.income[idx] = data;

      newData.transactions.income.map(v => {
        if (v.source === oldName) v.source = data.name;
      });
    } else {
      oldName = newData.accounts.expense[idx].name;

      newData.accounts.expense[idx] = data;

      newData.transactions.expense.map(v => {
        if (v.receiver === oldName) v.receiver = data.name;
      });
    }

    this.demoSubject.next(newData);
  }

  onDeleteAccount(type: string, idx: number) {
    let newData = this.demoSubject.value;
    let oldAccount = '';

    if (type === 'income') {
      oldAccount = newData.accounts.income[idx].name;

      newData.accounts.income.splice(idx, 1);

      newData.transactions.income = newData.transactions.income.filter(v => v.source != oldAccount);
    } else {
      oldAccount = newData.accounts.expense[idx].name;

      newData.accounts.expense.splice(idx, 1);

      newData.transactions.expense = newData.transactions.expense.filter(v => v.receiver != oldAccount);
    }

    this.demoSubject.next(newData);
  }

  onEditBalance(type: string, idx: number, amount: number) {
    let newData = this.demoSubject.value;

    if (type === 'main') {
      newData.accounts.main[idx].balance = amount;
    } else if (type === 'income') {
      newData.accounts.income[idx].balance = amount;
    } else {
      newData.accounts.income[idx].balance = amount;
    }

    this.demoSubject.next(newData);
  }

  onCreateTransaction(type: string, data: any) {
    let newData = this.demoSubject.value;

    if (type === 'transfer') {
      newData.transactions.transfer.push(data);
    } else if (type === 'income') {
      newData.transactions.income.push(data);
    } else {
      newData.transactions.expense.push(data);
    }

    this.demoSubject.next(newData);
  }

  onDeleteTransaction(type: string, idx: number) {
    let newData = this.demoSubject.value;

    if (type === 'transfer') {
      newData.transactions.transfer.splice(idx, 1)
    } else if (type === 'income') {
      newData.transactions.income.splice(idx, 1);
    } else {
      newData.transactions.expense.splice(idx, 1);
    }

    this.demoSubject.next(newData);
  }
}
