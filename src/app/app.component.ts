import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {StreamingPageComponent} from "./streaming-page/streaming-page.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, StreamingPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Blossom';
}
