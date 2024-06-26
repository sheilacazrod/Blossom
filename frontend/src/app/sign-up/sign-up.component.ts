import { Component } from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {FirebaseAuthService} from "../services/firebase-auth.service";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  errorMessage: string | null = null;
  constructor(private fb: FormBuilder,
              private authService: FirebaseAuthService,
              private dialogRef: MatDialogRef<SignUpComponent>) {
  }
  registerForm = this.fb.nonNullable.group({
    username: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
    password: ['', [Validators.required,Validators.maxLength(16),Validators.minLength(8)]],
    day: ['', [Validators.required, Validators.min(1), Validators.max(31)]],
    month: ['', [Validators.required]],
    year: ['', [Validators.required, Validators.min(1900), Validators.max(2024)]],
    email: ['', [Validators.required, Validators.email, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]]
  })
  submit() {
    if (this.registerForm.invalid) {
      this.errorMessage = 'Por favor, completa todos los campos correctamente.';
      return;
    }

    const rawForm = this.registerForm.getRawValue();
    this.authService.register(rawForm.email, rawForm.username, rawForm.password)
      .subscribe({
        next: () => {
          console.log("Usuario Registrado");
          window.location.reload();
        },
        error: (error) => {
          console.log(error.code);
          if (error.code === 'auth/email-already-in-use') {
            this.errorMessage = 'El correo electrónico ya está en uso.';
          } else {
            this.errorMessage = 'Se produjo un error al registrar el usuario. Por favor, inténtalo de nuevo más tarde.';
          }
        }
      });
  }
}
