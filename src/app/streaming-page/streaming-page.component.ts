import { Component } from '@angular/core';
import {StreamerSidebarComponent} from "../streamer-sidebar/streamer-sidebar.component";
import {SideBarComponent} from "../side-bar/side-bar.component";

@Component({
  selector: 'app-streaming-page',
  standalone: true,
  imports: [
    StreamerSidebarComponent,
    SideBarComponent
  ],
  templateUrl: './streaming-page.component.html',
  styleUrl: './streaming-page.component.css'
})
export class StreamingPageComponent {

}
