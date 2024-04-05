import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  openPopup(type: string): void {
    alert('HOLA');
  }
  openRegisterPopup() {
    const popup = document.getElementById('popup-registro');
    if (popup) {
      popup.style.display = 'block';
    }
  }
}
