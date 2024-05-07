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


@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {

  firebaseAuth = inject(Auth)
  private _firestore = inject(Firestore);

  user$ = user(this.firebaseAuth);
  currentUserSig = signal<User | null | undefined>(undefined);

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
          await this.saveUserData(username, profilePic);
          // await this.verifyUserEmail();
          return updateProfile(response.user, {displayName: username});
        } catch(error) {
          console.error("Ha habido un error al guardar sus datos.")
        }
      });
    return from(promise)
  }
  async saveUserData(username: string, profilePictureURL?:string) {
    const auth = getAuth();
    const user = auth.currentUser;

    try {
      if(user) {
        const userRef = doc(this._firestore, 'users/' + user?.uid);

        const userSnapshot = await getDoc(userRef);
        const userData = userSnapshot.data();

        if(userData) {
          await updateDoc(userRef, {
            'displayName': username,
          });
          // await this.updateUserEmail(email, password);
          return true;
        } else {
          await setDoc(userRef, {
            'displayName': username,
            'profilePictureURL': profilePictureURL
          }, { merge: true });
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error("Ha ocurrido un error al guardar los datos:", error);
      return false;
    }
  }

  async getUserData(): Promise<any> {
    const auth = getAuth();
    const user = auth.currentUser;

    try {
      if(user) {
        const docSnap = await getDoc(doc(this._firestore, 'users/' + user?.uid));
        if(docSnap.exists()) {
          console.log("Entro en getUserData")
          return { ...docSnap.data()};
        }
        return;
      }
    } catch (error) {
      console.error("Ha ocurrido un error al guardar los datos:", error);
      return [];
    }
  }
}
