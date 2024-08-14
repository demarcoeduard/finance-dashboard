import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { DatabaseService } from '../services/database.service';

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
  authService = inject(AuthService);
  dbService = inject(DatabaseService);

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
    this.authService.signUp(form.value.email, form.value.password).subscribe((response) => {
      const uid = response.user.uid;

      this.dbService.createUserData(uid).then(() => {
        this.dbService.getUserData(uid);
      });
      
      localStorage.setItem('uid', uid);
    })
  }
}
