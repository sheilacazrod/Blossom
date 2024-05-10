import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {RouterLink} from "@angular/router";
import {ApiService} from "../services/ApiService";
import {User} from "../model/user";
import {Observable} from "rxjs";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  users: User[] = [];
  constructor(private sanitizer: DomSanitizer, private  apiService: ApiService) {}
  videos = [
    'https://www.youtube.com/embed/BwD6WTEhftQ',
    'https://www.youtube.com/embed/oKVYm8mIUdo',
    'https://www.youtube.com/embed/av4sEcTS8QA'
  ];

  streamers = [
    'https://i.blogs.es/a715d3/rubius/1366_2000.jpeg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5JqVe5lDdlXcDJuNgPQpCs-pENfczAzFzQ41sfCJlJQ&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgYcIqWxkkONiyWo_UbJgaoWV328_jMEkvVEj_JKpi4g&s',
    'https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2019/05/ninja-twitch.jpg?tf=3840x',
    'https://fotos.perfil.com/2023/03/01/trim/1280/720/exodo-de-streamers-de-twitch-1518757.jpg',
    'https://orientacion-laboral.infojobs.net/wp-content/uploads/2023/04/streamers-jovenes-02.jpg'
  ];

  currentIndex = 0;


  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.apiService.getAllUsers()
      .then((booksObservable: Observable<User[]>) => {
        booksObservable.subscribe((users: User[]) => {
          this.users = users;
          console.log(this.users);
        });
      })
      .catch((error) => {
        console.error("Error al obtener los usuarios:", error);
      });
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.videos.length;
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.videos.length) % this.videos.length;
  }

  getVideoUrl(): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.videos[this.currentIndex]);
  }
}
