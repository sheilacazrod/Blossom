import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {User} from "../model/user";
import {ApiService} from "../services/ApiService";
import {StreamPreviewComponent} from "../streamPreview/stream-preview.component";

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

  constructor(private  apiService: ApiService) {
  }

  ngOnInit() {
    this.getAllUsers();
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

}
