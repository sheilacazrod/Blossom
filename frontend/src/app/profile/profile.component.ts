import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {TogglestreambuttonComponent} from "../togglestreambutton/togglestreambutton.component";
import {User} from "../model/user";
import {ApiService} from "../services/ApiService";
import {FirebaseAuthService} from "../services/firebase-auth.service";
import {Stream} from "../model/stream";
import {StreamPreviewComponent} from "../streamPreview/stream-preview.component";
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, TogglestreambuttonComponent, StreamPreviewComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  tabSeleccionado: string = 'perfil';
  isVisible: boolean = false;
  isEditingNombre: boolean = false;


  user: User | null = null;
  stream: Stream | null = null;
  private profilePicture?: File;
  urlImagenPerfil: string = 'ruta-a-tu-imagen.jpg';

  seleccionar(tab: string) {
    this.tabSeleccionado = tab;
  }

  constructor(private apiService: ApiService,
              private authService: FirebaseAuthService,) {
  }

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.getUserData();
      this.getStreamData();
    });
  }

  reloadPage() {
    window.location.reload()
  }


  async getStreamData():Promise<void>{
    try {
      this.stream = await this.apiService.getStreamData();
      console.log(this.stream)
    } catch (error) {
      console.error("Error al obtener los datos del stream:", error);
    }
  }
  async getUserData(): Promise<void> {
    try {
      this.user = await this.apiService.getUserData();
      this.urlImagenPerfil = this.user?.pictureURL || '';
    } catch (error) {
      console.error('Error al obtener datos de usuario:', error);
    }
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
    const index = this.stream?.categories.indexOf(Category);
    if(this.stream && index == -1){
      this.stream.categories.push(Category)
      console.log(this.stream)
    }
  }

  eraseCategory(Category: string) {
    if(this.stream){
      const index = this.stream?.categories.indexOf(Category);
      this.stream?.categories.splice(index, 1);
      console.log(this.stream)
    }
  }

  uploadProfilePicture(event: any) {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 10485760) {
        alert('El archivo debe ser menor a 10 MB.');
        return;
      }
      this.profilePicture = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        if(e.target) {
          this.urlImagenPerfil = e.target.result as string;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  submitUserData() {
    if(this.user){
      if(this.profilePicture != null) {
        this.authService.uploadProfilePicture(this.user,<File> this.profilePicture).then(
          (response) => {
            if(response) {
              console.log("La imagen se ha cargado.");
            } else {
              console.log("Ha habido un error al cargar la imagen.");
            }
            this.reloadPage()
          }
        );
      }
      else{
        this.apiService.updateUserData(this.user).then(
          () => {
            this.reloadPage()
          }
        );
      }
    }
  }

  async submitStreamData(){
    if(this.stream) {
      await this.apiService.updateStreamData(this.stream);
    }
    }
}

