import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {TogglestreambuttonComponent} from "../togglestreambutton/togglestreambutton.component";
import {User} from "../model/user";
import {ApiService} from "../services/ApiService";
import {FirebaseAuthService} from "../services/firebase-auth.service";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, TogglestreambuttonComponent], // Asegúrate de importar CommonModule y FormsModule aquí
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  selected_categories: Set<string> = new Set();
  tabSeleccionado: string = 'perfil';
  urlImagenPerfil: string = 'ruta-a-tu-imagen.jpg';
  isVisible: boolean = false; // Controla la visibilidad de la clave de transmisión
  isEditingNombre: boolean = false;


  user: User | null = null;


  seleccionar(tab: string) {
    this.tabSeleccionado = tab;
  }

  constructor(private apiService: ApiService,
              private authService: FirebaseAuthService,) {
  }

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.getUserData();
    });
  }

  async getUserData(): Promise<void> {
    try {
      this.user = await this.apiService.getUserData();
      this.urlImagenPerfil = this.user?.pictureURL || '';
    } catch (error) {
      console.error('Error al obtener datos de usuario:', error);
    }
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

  toggleVisibility() {
    this.isVisible = !this.isVisible;
    let inputElement = document.getElementById('transmissionKey') as HTMLInputElement;
    inputElement.type = this.isVisible ? 'text' : 'password';
  }

  toggleEditNombre() {
    this.isEditingNombre = !this.isEditingNombre;
  }

  addCategory(Category: string) {
    this.selected_categories.add(Category);
  }

  eraseCategory(Category: string) {
    this.selected_categories.delete(Category);
  }
}

