import {Component, Input} from '@angular/core';
import {RouterLink} from "@angular/router";
import {User} from "../model/user";

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
  @Input() user!: User;
}
