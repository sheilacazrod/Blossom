import { Component } from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {FirebaseAuthService} from "../services/firebase-auth.service";
import {MatDialogRef} from "@angular/material/dialog";

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

  errorMessage: string | null = null;
  constructor(private fb: FormBuilder,
              private authService: FirebaseAuthService,
              private dialogRef: MatDialogRef<LoginComponent>) {
  }
  loginForm = this.fb.nonNullable.group({
    loginMail: ['', [Validators.required]],
    loginPwd: ['',[ Validators.required,]]
  });

  submit() {
    const rawForm = this.loginForm.getRawValue();
    this.authService.login(rawForm.loginMail, rawForm.loginPwd)
      .subscribe({
        next: () => {
          window.location.reload();
        },
        error: (error) => {
          console.log(error.code);
          this.errorMessage = 'El correo electrónico o la contraseña son incorrectos.';
        }
      });
  }
}
