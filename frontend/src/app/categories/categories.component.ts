import { Component} from '@angular/core';
import {NgClass} from "@angular/common";
import {RouterLink} from "@angular/router";
import {StreamPreviewComponent} from "../streamPreview/stream-preview.component";
import {User} from "../model/user";
import {DomSanitizer} from "@angular/platform-browser";
import {ApiService} from "../services/ApiService";
import {Observable} from "rxjs";

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    NgClass,
    RouterLink,
    StreamPreviewComponent
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {
  selectedCategory: string = 'Videogames';
  users: User[] = [];

  constructor(private  apiService: ApiService) {}

  selectCategory(category: string) {
    this.selectedCategory = category;
    this.apiService.getStreamsByCategory(this.selectedCategory)
      .then((userObservable: Observable<User[]>) => {
        userObservable.subscribe((users: User[]) => {
          this.users = users;
        });
      })
      .catch((error) => {
        console.error("Error al obtener los usuarios:", error);
      });
  }

  ngOnInit(): void {
    this.selectCategory("Videogames");
  }

}
