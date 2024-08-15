import { inject, Injectable } from '@angular/core';
import { Data } from './data.model';
import { Database, DatabaseReference, onValue, push, ref, remove, set, update } from '@angular/fire/database';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  data:Data = {
    accounts: {
      main: [
        {
          name: 'Savings',
          balance: 0
        },
        {
          name: 'Budget',
          balance: 0
        },
        {
          name: 'Goal',
          balance: 0,
          target: 0
        }
      ],
      income: [],
      expense: [],
    },
    transactions: {
      transfer: [],
      income: [],
      expense: []
    }
  };
  db: Database = inject(Database);
  private dataSubject = new BehaviorSubject(this.data);

  constructor() {
    let uid = localStorage.getItem('uid');
    if (uid !== null) {
      this.fetchData(uid);
    }
  }

  private getUserRef(uid: string) {
    return ref(this.db, uid);
  }

  createUserData(uid: string): Promise<void> {
    return set(this.getUserRef(uid), this.data);
  }

  private convertToIndexedArray(data: { [key: string]: any }) {
    return Object.keys(data).map(key => ({key, ...data[key]}));
  }

  fetchData(uid: string) {
    onValue(this.getUserRef(uid), (snapshot) => {
      let data = snapshot.val();
      let userData: Data = {
        accounts: {
          main: data.accounts.main,
          income: this.convertToIndexedArray(data.accounts?.income ?? []),
          expense: this.convertToIndexedArray(data.accounts?.expense ?? []),
        },
        transactions: {
          transfer: this.convertToIndexedArray(data.transactions?.transfer ?? []),
          income: this.convertToIndexedArray(data.transactions?.income ?? []),
          expense: this.convertToIndexedArray(data.transactions?.expense ?? [])
        }
      }
      this.dataSubject.next(userData);
    });
  }
  
  getData(): Observable<any> {
    return this.dataSubject.asObservable();
  }
  
  onCreateAccount(type: string, data: any) {
    let uid = localStorage.getItem('uid');
    let accounts!: DatabaseReference;

    if (type === 'income') {
      accounts = ref(this.db, `${uid}/accounts/income`);
    } else {
      accounts = ref(this.db, `${uid}/accounts/expense`);
    }

    push(accounts, data);
    this.fetchData(uid!);
  }

  private checkTransactions(type: string, arr1: any[], arr2: any[]) {
    if (arr1.length !== arr2.length) return true;

    if (type === 'income') {
      for (let i = 0; i < arr1.length; i++) {
        if (arr1[i].source !== arr2[i].source) return true;
      };
    } else {
      for (let i = 0; i < arr1.length; i++) {
        if (arr1[i].receiver !== arr2[i].receiver) return true;
      };
    };

    return false;
  }

  onEditAccount(type: string, idx: number, data: any) {
    let uid = localStorage.getItem('uid');
    let accounts!: DatabaseReference;
    let transactions!: DatabaseReference;
    let oldData = this.dataSubject.value;
    let newData = this.dataSubject.value;
    let oldName = '';
    let key = '';

    if (type === 'main') {
      accounts = ref(this.db, `${uid}/accounts/main/${idx}`);
    } else if (type === 'income') {
      key = oldData.accounts.income[idx].key!;
      accounts = ref(this.db, `${uid}/accounts/income/${key}`);
      
      oldName = oldData.accounts.income[idx].name;

      newData.transactions.income.map(v => {
        if (v.source === oldName) v.source = data.name;
      });

      if (this.checkTransactions('income', oldData.transactions.income, newData.transactions.income)) {
        transactions = ref(this.db, `${uid}/transactions/income`);
        set(transactions, newData.transactions.income);
      };
    } else {
      key = oldData.accounts.expense[idx].key!;
      accounts = ref(this.db, `${uid}/accounts/expense/${key}`);
      
      oldName = oldData.accounts.expense[idx].name;

      newData.transactions.expense.map(v => {
        if (v.receiver === oldName) v.receiver = data.name;
      });

      if (this.checkTransactions('expense', oldData.transactions.expense, newData.transactions.expense)) {
        transactions = ref(this.db, `${uid}/transactions/expense`);
        set(transactions, newData.transactions.expense);
      };
    };
 
    set(accounts, data);
    this.fetchData(uid!);
  }

  onDeleteAccount(type: string, idx: number) {
    let uid = localStorage.getItem('uid');
    let account!: DatabaseReference;
    let transactions!: DatabaseReference;
    let oldData = this.dataSubject.value;
    let newData = this.dataSubject.value;
    let oldName = '';
    let key = '';

    if (type === 'income') {
      key = oldData.accounts.income[idx].key!;
      account = ref(this.db, `${uid}/accounts/income/${key}`);

      oldName = oldData.accounts.income[idx].name;

      newData.transactions.income = newData.transactions.income.filter(v => v.source !== oldName);

      if (this.checkTransactions('income', oldData.transactions.income, newData.transactions.income)) {
        transactions = ref(this.db, `${uid}/transactions/income`);
        set(transactions, newData.transactions.income);
      };
    } else {
      key = oldData.accounts.expense[idx].key!;
      account = ref(this.db, `${uid}/accounts/expense/${key}`);

      oldName = oldData.accounts.expense[idx].name;

      newData.transactions.expense = newData.transactions.expense.filter(v => v.receiver !== oldName);

      if (this.checkTransactions('expense', oldData.transactions.expense, newData.transactions.expense)) {
        transactions = ref(this.db, `${uid}/transactions/expense`);
        set(transactions, newData.transactions.expense);
      };
    };

    remove(account);
    this.fetchData(uid!);
  }

  onEditBalance(type: string, idx: number, amount: number) {
    let uid = localStorage.getItem('uid');
    let account!: DatabaseReference;
    let data = this.dataSubject.value.accounts;
    let key = '';

    if (type === 'main') {
      account = ref(this.db, `${uid}/accounts/main/${idx}`);
    } else if (type === 'income') {
      key = data.income[idx].key!;
      account = ref(this.db, `${uid}/accounts/income/${key}`);
    } else {
      key = data.expense[idx].key!;
      account = ref(this.db, `${uid}/accounts/expense/${key}`);
    }

    update(account, {balance: amount});
    this.fetchData(uid!);
  }

  onCreateTransaction(type: string, data: any) {
    let uid = localStorage.getItem('uid');
    let transactions!: DatabaseReference;

    if (type === 'transfer') {
      transactions = ref(this.db, `${uid}/transactions/transfer`);
    } else if (type === 'income') {
      transactions = ref(this.db, `${uid}/transactions/income`);
    } else {
      transactions = ref(this.db, `${uid}/transactions/expense`);
    }

    push(transactions, data);
    this.fetchData(uid!);
  }

  onDeleteTransaction(type: string, idx: number) {
    let uid = localStorage.getItem('uid');
    let transaction!: DatabaseReference;
    let data = this.dataSubject.value.transactions;
    let key = '';

    if (type === 'transfer') {
      key = data.transfer[idx].key!;
      transaction = ref(this.db, `${uid}/transactions/transfer/${key}`);
    } else if (type === 'income') {
      key = data.income[idx].key!;
      transaction = ref(this.db, `${uid}/transactions/income/${key}`);
    } else {
      key = data.expense[idx].key!;
      transaction = ref(this.db, `${uid}/transactions/expense/${key}`);
    }

    remove(transaction);
    this.fetchData(uid!);
  }
}
