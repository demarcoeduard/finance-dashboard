import { inject, Injectable } from '@angular/core';
import { Data } from './data.model';
import { Database, onValue, ref, set } from '@angular/fire/database';
import { DemoService } from './demo.service';

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
  demoService = inject(DemoService);

  private getUserRef(uid: string) {
    return ref(this.db, uid);
  }

  createUserData(uid: string): Promise<void> {
    return set(this.getUserRef(uid), this.data);
  }

  getUserData(uid: string) {
    onValue(this.getUserRef(uid), (snapshot) => {
      const data = snapshot.val();
      this.demoService.onDisplayUserData(data.accounts.main);
    });
  };
  

  
}
