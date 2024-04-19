import { Component } from '@angular/core';
import {SideBarComponent} from "../side-bar/side-bar.component";
import {SidenavComponent} from "../sidenav/sidenav.component";

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    SideBarComponent,
    SidenavComponent
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {
  extended = false;
}
