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

  onChangeForm(event: KeyboardEvent) {
    if(event.key === 'Enter') {
      this.isSignUp = !this.isSignUp;       
    }
  }

  onSubmit(form: NgForm) {
    console.log(form)
  }
}
