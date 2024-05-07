import {inject, Injectable, signal} from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword, getAuth,
  signInWithEmailAndPassword, signOut,
  updateProfile,
  user
} from "@angular/fire/auth";
import {from, Observable} from "rxjs";
import {User} from "../model/user";
import {doc, Firestore, getDoc, setDoc, updateDoc} from "@angular/fire/firestore";
import {HttpClient} from "@angular/common/http";
import {ApiService} from "./ApiService";


@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {

  firebaseAuth = inject(Auth)
  private _firestore = inject(Firestore);

  user$ = user(this.firebaseAuth);
  currentUserSig = signal<User | null | undefined>(undefined);

  constructor(private apiService: ApiService ,private http: HttpClient) {
  }
  login(email: string, password: string): Observable<void>{
    const promise = signInWithEmailAndPassword(this.firebaseAuth, email, password)
      .then(() =>{});
    return from(promise);
  }

  logout() {
    const promise = signOut(this.firebaseAuth);
    return from(promise);
  }

  register(email: string, username: string , password: string): Observable<void> {
    const promise = createUserWithEmailAndPassword(this.firebaseAuth, email, password)
      .then(async response => {
        console.log("Response register: ", response);
        try {
          const profilePic: string = 'https://png.pngtree.com/background/20230525/original/pngtree-an-egg-with-a-sad-face-sitting-on-a-dark-background-picture-image_2726098.jpg'
          const auth = getAuth();
          const user = auth.currentUser;
          if(user){
            this.apiService.saveUserData(username, profilePic, user.uid.toString()).subscribe(
              response => {
                console.log('Respuesta del servidor:', response);
                // Aquí puedes manejar la respuesta del servidor
              },
              error => {
                console.error('Error al realizar la solicitud:', error);
                // Aquí puedes manejar el error
              }
            );
          }
          // await this.verifyUserEmail();
          return updateProfile(response.user, {displayName: username});
        } catch(error) {
          console.error("Ha habido un error al guardar sus datos.")
        }
      });
    return from(promise)
  }
  async getUserData(): Promise<any> {
    const auth = getAuth();
    const user = auth.currentUser;
    //167.71.61.5:8080/getUserById
    return this.http.post<any>('http://localhost:8080/getUserById', user?.uid);
  }
}
