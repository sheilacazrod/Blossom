import { Component} from '@angular/core';
import {NgClass} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    NgClass,
    RouterLink
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {
  selectedCategory: string = 'VIDEOGAMES';
  selectCategory(category: string) {
    this.selectedCategory = category;
  }
}
