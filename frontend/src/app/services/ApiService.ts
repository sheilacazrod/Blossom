import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {getAuth} from "@angular/fire/auth";
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

  async getUserByName(name: string): Promise<any> {
    return this.http.get<any>(`${this.apiUrl}/getUserByUsername?username=${name}`).toPromise();
  }

  async getAllUsers(){
    return this.http.get<any>(`${this.apiUrl}/getAllUsers`) as Observable<User[]>
  }

  async updatePicture(user: User, profilePictureURL: string) {
    const userDTO = {
      userId: user.userId,
      pictureURL: profilePictureURL,
      displayName: user.username,
      biography: user.biography
    };

    try {
      const response = await this.http.put<any>(`${this.apiUrl}/updateUser`, userDTO).toPromise();
      console.log("Respuesta de la actualización del usuario:", response);
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
      throw error;
    }
  }

  async updateUserData(user: User) {
    const userDTO = {
      userId: user.userId,
      pictureURL: user.pictureURL,
      displayName: user.username,
      biography: user.biography
    };

    try {
      const response = await this.http.put<any>(`${this.apiUrl}/updateUser`, userDTO).toPromise();
      console.log("Respuesta de la actualización del usuario:", response);
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
      throw error;
    }
  }

  async addFollow(followedId: string){
    const auth = getAuth();
    const user = auth.currentUser;
    try {
      const response = await this.http.put<any>(`${this.apiUrl}/addFollowed?userId=${user?.uid}&followedId=${followedId}`, {}).toPromise();
      console.log("Respuesta de añadir follow:", response);
    } catch (error) {
      console.error("Error al añadir follow:", error);
      throw error;
    }
  }

  async getFollowers(): Promise<any> {
    const auth = getAuth();
    const user = auth.currentUser;
    return this.http.get<any>(`${this.apiUrl}/getFollowed?userId=${user?.uid}`) as Observable<User[]>
  }

}
