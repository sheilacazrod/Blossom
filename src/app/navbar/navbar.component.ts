import { Component } from '@angular/core';
import {RegisterButtonComponent} from "../register-button/register-button.component";
import {LoginButtonComponent} from "../login-button/login-button.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RegisterButtonComponent,
    LoginButtonComponent
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  openPopup(type: string): void {
    alert('Añadir Formulario que estaba en html');
  }
  constructor(private router: Router) { }

  navigateToProfile() {
    this.router.navigate(['/profile']);
  }
  navigateToStreaming() {
    this.router.navigate(['/streaming']);
  }
}
