import {inject, Injectable, signal} from '@angular/core';
import {getDownloadURL, getStorage, ref, uploadBytes} from '@angular/fire/storage';

import {
  Auth,
  createUserWithEmailAndPassword, getAuth,
  signInWithEmailAndPassword, signOut,
  updateProfile,
  user
} from "@angular/fire/auth";
import {from, Observable} from "rxjs";
import {UserApi} from "../model/userApi";
import {ApiService} from "./ApiService";
import {doc} from "@angular/fire/firestore";
import {User} from "../model/user";


@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {

  firebaseAuth = inject(Auth)

  user$ = user(this.firebaseAuth);
  currentUserSig = signal<UserApi | null | undefined>(undefined);

  constructor(private apiService: ApiService) {
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
            this.apiService.createUser(username, profilePic, user.uid.toString()).subscribe(
              response => {
                console.log('Respuesta del servidor:', response);
              },
              error => {
                console.error('Error al realizar la solicitud:', error);
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

  // async uploadProfilePicture(profilePicture: File): Promise<boolean> {
  //   const auth = getAuth();
  //   const user = auth.currentUser;
  //
  //   if(user) {
  //     const storage = getStorage();
  //     const storagePath = user.uid + '/' + 'profilePicture.jpg';
  //     const storageRef = ref(storage, storagePath);
  //
  //     try {
  //       await uploadBytes(storageRef, profilePicture);
  //       await this.apiService.updateUserData(user.displayName,await getDownloadURL(storageRef),user.uid)
  //       console.log("Imagen cargada con éxito!");
  //       return true;
  //     } catch (error) {
  //       console.error("Ha habido un error al cargar la imagen.");
  //       return false;
  //     }
  //   } else {
  //     return false;
  //   }
  // }

  async uploadProfilePicture(user: User, profilePicture: File): Promise<boolean> {
      const storage = getStorage();
      const storagePath = user.userId + '/' + 'profilePicture.jpg';
      const storageRef = ref(storage, storagePath);

      try {
        await uploadBytes(storageRef, profilePicture);
        await this.apiService.updatePicture(user, await getDownloadURL(storageRef))
        console.log("Imagen cargada con éxito!");
        return true;
      } catch (error) {
        console.error("Ha habido un error al cargar la imagen.");
        return false;
      }
  }
}
