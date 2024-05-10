import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {getAuth} from "@angular/fire/auth";
import {UserApi} from "../model/userApi";
import {User} from "../model/user";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8080'; // Reemplaza esto con la URL de tu API

  constructor(private http: HttpClient) { }

  // Método para realizar una solicitud POST
  createUser(username: string, profilePictureURL:string, uid: string): Observable<any> {
    const userDTO = {
      userId: uid,
      pictureURL: profilePictureURL,
      displayName: username,
      biography: '',
    };

    return this.http.post<any>(`${this.apiUrl}/createUser`, userDTO);
  }

  async getUserData(): Promise<any> {
    const auth = getAuth();
    const user = auth.currentUser;

    return this.http.get<any>(`${this.apiUrl}/getUserById?id=${user?.uid}`).toPromise();
  }

  async getAllUsers(){
    return this.http.get<any>(`${this.apiUrl}/getAllUsers`) as Observable<User[]>
  }

  async updateUserData(username: string | null, profilePictureURL: string, uid: string) {
    const userDTO = {
      userId: uid,
      pictureURL: profilePictureURL,
      displayName: username,
      biography: ''
    };

    try {
      const response = await this.http.put<any>(`${this.apiUrl}/updateUser`, userDTO).toPromise();
      console.log("Respuesta de la actualización del usuario:", response);
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
      throw error;
    }
  }

}
