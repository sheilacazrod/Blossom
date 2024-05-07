import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {getAuth} from "@angular/fire/auth";
import {UserApi} from "../model/userApi";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8080'; // Reemplaza esto con la URL de tu API

  constructor(private http: HttpClient) { }

  // Método para realizar una solicitud POST
  saveUserData(username: string, profilePictureURL:string, uid: string): Observable<any> {
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

    //167.71.61.5:8080/getUserById
    return this.http.get<any>(`${this.apiUrl}/getUserById?id=${user?.uid}`).toPromise();
  }

}
