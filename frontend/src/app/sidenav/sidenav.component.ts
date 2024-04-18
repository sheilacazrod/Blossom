import { Component } from '@angular/core';
import {StreamerSidebarComponent} from "../streamer-sidebar/streamer-sidebar.component";
import { EventEmitter, Output } from '@angular/core';



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
  @Output() extended =new EventEmitter<boolean>();

  Toggle() {
    this.extended.emit(true);
  }

}

