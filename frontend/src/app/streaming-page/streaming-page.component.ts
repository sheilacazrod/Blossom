import { Component } from '@angular/core';
import {StreamerSidebarComponent} from "../streamer-sidebar/streamer-sidebar.component";
import {SideBarComponent} from "../side-bar/side-bar.component";
import {VgCoreModule} from "@videogular/ngx-videogular/core";
import {SidenavComponent} from "../sidenav/sidenav.component";

@Component({
  selector: 'app-streaming-page',
  standalone: true,
  imports: [
    StreamerSidebarComponent,
    SideBarComponent,
    VgCoreModule,
    SidenavComponent
  ],
  templateUrl: './streaming-page.component.html',
  styleUrl: './streaming-page.component.css'
})
export class StreamingPageComponent {
  src1: string = "https://pruebastreaming.ddns.net/?hls=hls1";
  src2: string = "https://pruebastreaming.ddns.net/?hls=hls2";
  changeSrc(a: number) {
  extended = false;

    const playerIframe = document.getElementById('player') as HTMLIFrameElement;
    if (a==1){
      if (playerIframe) {
        playerIframe.src = this.src1;
      }
    }
    if (a==2){
      if (playerIframe) {
        playerIframe.src = this.src2;
      }
    }

  }
}
