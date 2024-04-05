import { Component } from '@angular/core';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  // Método para manejar el registro
  onRegister() {
    // Lógica de registro
  }

  // Método para cerrar el pop-up
  closePopup() {
    const popup = document.getElementById('popup-registro');
    if (popup) {
      popup.style.display = 'none';
    }
  }
}
