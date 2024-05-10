import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {RouterLink} from "@angular/router";
import {ApiService} from "../services/ApiService";
import {User} from "../model/user";
import {Observable} from "rxjs";
import {StreamPreviewComponent} from "../streamPreview/stream-preview.component";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink,
    StreamPreviewComponent
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

  currentIndex = 0;


  ngOnInit(): void {
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
