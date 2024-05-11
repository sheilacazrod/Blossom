import {Component, inject, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {User} from "../model/user";
import {ApiService} from "../services/ApiService";
import {StreamPreviewComponent} from "../streamPreview/stream-preview.component";
import {FirebaseAuthService} from "../services/firebase-auth.service";

@Component({
  selector: 'app-following',
  standalone: true,
  imports: [
    StreamPreviewComponent
  ],
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css']
})
export class FollowingComponent implements OnInit {
  users: User[] = [];
  follows: User[] = [];

  authService = inject(FirebaseAuthService)
  constructor(private  apiService: ApiService) {
  }

  ngOnInit() {
    this.getAllUsers();
    this.authService.user$.subscribe((user) =>{
      this.getFollowers();
    });
  }
  getAllUsers() {
    this.apiService.getAllUsers()
      .then((booksObservable: Observable<User[]>) => {
        booksObservable.subscribe((users: User[]) => {
          this.users = users;
        });
      })
      .catch((error) => {
        console.error("Error al obtener los usuarios:", error);
      });
  }

  getFollowers(){
    this.apiService.getFollowers()
      .then((booksObservable: Observable<User[]>) => {
        booksObservable.subscribe((users: User[]) => {
          this.follows = users;
          console.log(this.follows)
        });
      })
      .catch((error) => {
        console.error("Error al obtener los seguidores:", error);
      });
  }

}
