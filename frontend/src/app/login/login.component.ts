import { Component } from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private fb: FormBuilder) {
  }
  loginForm = this.fb.group({
    loginUser: ['', [Validators.required]],
    loginPwd: ['',[ Validators.required,]]
  });

  submit() {
    if (this.loginForm.valid) {
      console.log('Usuario autenticado')
    }
    else{
      console.log('Error')
    }
  }
}
