import { Component } from '@angular/core';
import {StreamerSidebarComponent} from "../streamer-sidebar/streamer-sidebar.component";


@Component({
  selector: 'app-sidenav',
  standalone: true,
  templateUrl: './sidenav.component.html',
  imports: [
    StreamerSidebarComponent
  ],
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent {


}

