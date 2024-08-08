import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DemoService {
  demo = {
    accounts: {
      main: {
        saving: {
          balance: 5000
        },
        budget: {
          balance: 1500
        },
        goal: {
          balance: 2000,
          target: 5000
        }
      },
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
          source: 'saving',
          amount: 500,
          receiver: 'budget'
        },
        {
          source: 'budget',
          amount: 200,
          receiver: 'saving'
        },
        {
          source: 'budget',
          amount: 300,
          receiver: 'goal'
        },
        {
          source: 'goal',
          amount: 100,
          receiver: 'saving'
        },
        {
          source: 'saving',
          amount: 1000,
          receiver: 'goal'
        },
        {
          source: 'budget',
          amount: 500,
          receiver: 'saving'
        }
      ],
      income: [
        {
          source: 'Salary',
          amount: 3000,
          receiver: 'saving'
        },
        {
          source: 'Freelance',
          amount: 1500,
          receiver: 'budget'
        },
        {
          source: 'Investment Returns',
          amount: 1000,
          receiver: 'goal'
        },
        {
          source: 'Rental Income',
          amount: 1200,
          receiver: 'saving'
        },
        {
          source: 'Side Business',
          amount: 800,
          receiver: 'budget'
        },
        {
          source: 'Dividends',
          amount: 600,
          receiver: 'goal'
        }
      ],
      expense: [
        {
          source: 'budget',
          amount: 1200,
          receiver: 'Rent'
        },
        {
          source: 'saving',
          amount: 400,
          receiver: 'Groceries'
        },
        {
          source: 'budget',
          amount: 250,
          receiver: 'Utilities'
        },
        {
          source: 'saving',
          amount: 150,
          receiver: 'Transportation'
        },
        {
          source: 'budget',
          amount: 300,
          receiver: 'Insurance'
        },
        {
          source: 'saving',
          amount: 200,
          receiver: 'Entertainment'
        }
      ]
    }
  };  

  constructor() { }
}
