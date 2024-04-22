import { Component} from '@angular/core';
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    NgClass
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
