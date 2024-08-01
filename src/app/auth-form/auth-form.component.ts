import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.css'
})
export class AuthFormComponent {
  isSignUp = true;
  isAlert = false;
  alertName = 'Existing account';
  alertMessage = 'An account with this email already exists. Please choose a different email or log in with the existing account.'

  onChangeForm() {
    this.isSignUp = !this.isSignUp;       
  }
  
  handleChangeForm(event: KeyboardEvent) {
    if(event.key === 'Enter') {
      this.isSignUp = !this.isSignUp;       
    }
  }

  onAlert() {
    this.isAlert = !this.isAlert;
  }

  handleAlert(event: KeyboardEvent) {
    if(event.key === 'Enter') {
      this.onAlert();
    }
  }

  onSubmit(form: NgForm) {
    console.log(form)
  }
}
