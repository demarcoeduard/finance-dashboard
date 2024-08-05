import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-main-accounts',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './main-accounts.component.html',
  styleUrl: './main-accounts.component.css'
})
export class MainAccountsComponent {
  popup = 0;
  balance = 100000000;
  targetBalance = 100000000;

  onShowPopup(id: number) {
    if (this.popup === id) {
      this.popup = 0;
    } else {
      this.popup = id;
    }
  }

  onSubmit() {

  }
}
