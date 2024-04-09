import { Component } from '@angular/core';
import {NgClass} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    NgClass,
    FormsModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  tabSeleccionado: string = 'perfil';
  urlImagenPerfil: string = 'ruta-a-tu-imagen.jpg';
  nombrePerfil: string = '';
  biografia: string = '';

  seleccionar(tab: string) {
    this.tabSeleccionado = tab;
  }

  actualizarImagen() {
    // Lógica para actualizar la imagen de perfil
  }

  guardarCambios() {
    // Lógica para guardar los cambios del perfil
  }
}
