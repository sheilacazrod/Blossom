import {inject, Injectable, signal} from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  user
} from "@angular/fire/auth";
import {from, Observable} from "rxjs";
import {User} from "../model/user";

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {

  firebaseAuth = inject(Auth)
  user$ = user(this.firebaseAuth);
  currentUserSig = signal<User | null | undefined>(undefined);
  register(email: string, username: string, password: string): Observable<void> {
    const promise = createUserWithEmailAndPassword(this.firebaseAuth, email, password)
      .then(response => {
        return updateProfile(response.user, {displayName: username});
      });
    return from(promise)
  }

  login(email: string, password: string): Observable<void>{
    const promise = signInWithEmailAndPassword(this.firebaseAuth, email, password)
      .then(() =>{});
    return from(promise);
  }
}
