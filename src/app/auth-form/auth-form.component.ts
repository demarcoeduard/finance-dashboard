import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';

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
  alertType = '';
  authService = inject(AuthService);
  dataService = inject(DataService);
  router = inject(Router);

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
    if (this.isSignUp) {
      this.authService.signUp(form.value.email, form.value.password).subscribe({
        next: response => {
          const uid = response.user.uid;
          
          localStorage.setItem('uid', uid);

          this.dataService.createUserData(uid).then(() => {
            let data = this.dataService.fetchData(uid);

            this.dataService.onSetMode();
            
            if (data) {
              this.router.navigate(['/dashboard']);
            }
          });
        },
        error: error => {
          this.alertType = 'exist';
          this.onAlert();
        }
      });
    } else {
      this.authService.signIn(form.value.email, form.value.password).subscribe({
        next: response => {
          const uid = response.user.uid;

          localStorage.setItem('uid', uid);

          this.dataService.fetchData(uid);
          this.dataService.onSetMode();

          this.router.navigate(['/dashboard']);
        },
        error: error => {
          this.alertType = 'incorrect';
          this.onAlert();
        }
      });
    }
  }
}
