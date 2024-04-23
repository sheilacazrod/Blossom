import { Component } from '@angular/core';
import {StreamerSidebarComponent} from "../streamer-sidebar/streamer-sidebar.component";
import { EventEmitter, Output } from '@angular/core';
import {RouterLink} from "@angular/router";



@Component({
  selector: 'app-sidenav',
  standalone: true,
  templateUrl: './sidenav.component.html',
  imports: [
    StreamerSidebarComponent,
    RouterLink
  ],
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent {
  @Output() extended =new EventEmitter<boolean>();

  Toggle() {
    this.extended.emit(true);
  }

}

