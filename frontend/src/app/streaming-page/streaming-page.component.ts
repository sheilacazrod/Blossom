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
  extended = false;
  src1: string = "https://6ojztw.stackhero-network.com/streaming.html?hls=hls";
  src2: string = "https://6ojztw.stackhero-network.com/streaming.html?hls=hls1";
  changeSrc(a: number) {

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
