import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-streamer-sidebar',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './streamer-sidebar.component.html',
  styleUrl: './streamer-sidebar.component.css'
})
export class StreamerSidebarComponent {

}
