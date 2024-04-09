import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {StreamingPageComponent} from "./streaming-page/streaming-page.component";
import {NavbarComponent} from "./navbar/navbar.component";
import {RegisterButtonComponent} from "./register-button/register-button.component";
import {LoginButtonComponent} from "./login-button/login-button.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    StreamingPageComponent,
    NavbarComponent,
    RegisterButtonComponent,
    LoginButtonComponent,
    CommonModule,
    FormsModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Blossom';
}
