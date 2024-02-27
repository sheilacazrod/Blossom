import { Component } from '@angular/core';
import {StreamerSidebarComponent} from "../streamer-sidebar/streamer-sidebar.component";

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [
    StreamerSidebarComponent
  ],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {

}
