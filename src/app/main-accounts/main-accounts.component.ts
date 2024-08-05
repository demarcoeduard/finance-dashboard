import { Component } from '@angular/core';

@Component({
  selector: 'app-main-accounts',
  standalone: true,
  imports: [],
  templateUrl: './main-accounts.component.html',
  styleUrl: './main-accounts.component.css'
})
export class MainAccountsComponent {
  popup = 0;

  onShowPopup(id: number) {
    if (this.popup === id) {
      this.popup = 0;
    } else {
      this.popup = id;
    }
  }

}
