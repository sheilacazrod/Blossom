import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {getAuth} from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8080'; // Reemplaza esto con la URL de tu API

  constructor(private http: HttpClient) { }

  // Método para realizar una solicitud POST
  saveUserData(username: string, profilePictureURL:string): Observable<any> {
    console.log("entró")
    const auth = getAuth();
    const user = auth.currentUser;
    const userDTO = {
      UID: user?.uid || '',
      displayName: username,
      pictureURL: profilePictureURL,
      biography: '',
    };

    return this.http.post<any>(`${this.apiUrl}/createUser`, userDTO);
  }
}
