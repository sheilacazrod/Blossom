import {Component, Input} from '@angular/core';
import {RouterLink} from "@angular/router";
import {User} from "../model/user";

@Component({
  selector: 'app-streamer-sidenav',
  standalone: true,
    imports: [
        RouterLink
    ],
  templateUrl: './streamer-sidenav.component.html',
  styleUrl: './streamer-sidenav.component.css'
})
export class StreamerSidenavComponent {
  @Input() user!: User;
}
