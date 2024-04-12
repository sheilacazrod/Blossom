import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule], // Asegúrate de importar CommonModule y FormsModule aquí
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent {
  tabSeleccionado: string = 'perfil';
  urlImagenPerfil: string = 'ruta-a-tu-imagen.jpg';
  nombrePerfil: string = '';
  biografia: string = '';
  serverLink: string = 'https://server.com/link'; // Link del servidor
  isEditing: boolean = false; // Controla si el link del servidor es editable
  isVisible: boolean = false; // Controla la visibilidad de la clave de transmisión

  seleccionar(tab: string) {
    this.tabSeleccionado = tab;
  }

  actualizarImagen() {
    // Lógica para actualizar la imagen de perfil
  }

  guardarCambios() {
    // Lógica para guardar los cambios del perfil
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  toggleVisibility() {
    this.isVisible = !this.isVisible;
    let inputElement = document.getElementById('transmissionKey') as HTMLInputElement;
    inputElement.type = this.isVisible ? 'text' : 'password';
  }

}
