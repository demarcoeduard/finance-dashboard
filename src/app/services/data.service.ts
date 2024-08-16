import { inject, Injectable } from '@angular/core';
import { DemoService } from './demo.service';
import { DatabaseService } from './database.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private demoService = inject(DemoService);
  private dbService = inject(DatabaseService);
  demoMode = true;

  constructor() {
    let uid = localStorage.getItem('uid');
    if (uid !== null) {
      this.demoMode = false;
    };
  }

  onSetMode() {
    this.demoMode = !this.demoMode;
  }

  getData(): Observable<any> {
    if (this.demoMode) {
      return this.demoService.getData();
    } else {
      return this.dbService.getData();
    };
  }

  createUserData(uid: string) {
    return this.dbService.createUserData(uid);
  }

  fetchData(uid: string) {
    this.dbService.fetchData(uid);
  }

  onGetTheme(): Promise<void> {
    return new Promise((resolve) => {
      this.dbService.getData().subscribe(() => {
        resolve();
      })
    })
  }

  onSetTheme(theme: string) {
    this.dbService.onSetTheme(theme);
  }

  onCreateAccount(type: string, data: any) {
    if (this.demoMode) {
      this.demoService.onCreateAccount(type, data);
    } else {
      this.dbService.onCreateAccount(type, data);
    };
  }

  onEditAccount(type: string, idx: number, data: any) {
    if (this.demoMode) {
      this.demoService.onEditAccount(type, idx, data);
    } else {
      this.dbService.onEditAccount(type, idx, data);
    };
  }

  onDeleteAccount(type: string, idx: number) {
    if (this.demoMode) {
      this.demoService.onDeleteAccount(type, idx);
    } else {
      this.dbService.onDeleteAccount(type, idx);
    };
  }

  onEditBalance(type: string, idx: number, amount: number) {
    if (this.demoMode) {
      this.demoService.onEditBalance(type, idx, amount);
    } else {
      this.dbService.onEditBalance(type, idx, amount);
    };
  }

  onCreateTransaction(type: string, data: any) {
    if (this.demoMode) {
      this.demoService.onCreateTransaction(type, data);
    } else {
      this.dbService.onCreateTransaction(type, data);
    };
  }

  onDeleteTransaction(type: string, idx: number) {
    if (this.demoMode) {
      this.demoService.onDeleteTransaction(type, idx);
    } else {
      this.dbService.onDeleteTransaction(type, idx);
    }
  }
}
