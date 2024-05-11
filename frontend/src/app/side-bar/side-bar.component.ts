import {Component, EventEmitter, Input, Output} from '@angular/core';
import {StreamerSidebarComponent} from "../streamer-sidebar/streamer-sidebar.component";
import {User} from "../model/user";
import {Observable} from "rxjs";
import {ApiService} from "../services/ApiService";
import {StreamPreviewComponent} from "../streamPreview/stream-preview.component";

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [
    StreamerSidebarComponent,
    StreamPreviewComponent
  ],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {
  @Output() extended =new EventEmitter<boolean>();
  @Input() follows: User[] = [];

  Toggle() {
    this.extended.emit(false);
  }
}
