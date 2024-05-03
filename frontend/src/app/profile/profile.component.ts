import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {TogglestreambuttonComponent} from "../togglestreambutton/togglestreambutton.component";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, TogglestreambuttonComponent], // Asegúrate de importar CommonModule y FormsModule aquí
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  tabSeleccionado: string = 'perfil';
  urlImagenPerfil: string = 'ruta-a-tu-imagen.jpg';
  nombrePerfil: string = 'Perfil-Name';
  biografia: string = 'Deja que los demás sepan de ti, escribe tu biografía';
  serverLink: string = 'https://server.com/link'; // Link del servidor
  isEditing: boolean = false; // Controla si el link del servidor es editable
  isVisible: boolean = false; // Controla la visibilidad de la clave de transmisión
  isEditingNombre: boolean = false;
  seleccionar(tab: string) {
    this.tabSeleccionado = tab;
  }

  constructor() {
    this.nombrePerfil = this.nombrePerfil;
    this.biografia = this.biografia;
    this.urlImagenPerfil = '../../assets/Profile.png';
  }

  actualizarImagen() {
    const inputElement = document.createElement('input');
    inputElement.type = 'file';
    inputElement.accept = 'image/png, image/jpeg';
    inputElement.onchange = (event) => {
      // Asegúrate de que event.target y files no son null con el operador de aserción no nula (!)
      const file = (event.target as HTMLInputElement).files![0];
      if (file) {
        if (file.size > 10485760) {
          alert('El archivo debe ser menor a 10 MB.');
          return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
          // Asegúrate de que e.target no es null con el operador de aserción no nula (!)
          this.urlImagenPerfil = (e.target as FileReader).result! as string;
        };
        reader.readAsDataURL(file);
      }
    };
    inputElement.click();
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

  toggleEditNombre() {
    this.isEditingNombre = !this.isEditingNombre;
  }

  ngOnInit(): void {
    // Aquí puedes inicializar cualquier lógica que necesites cuando el componente se cargue
  }

}
